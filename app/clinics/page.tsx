// app/clinics/page.tsx
import { query } from "@/database/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClinicMap from "@/components/ClinicMap";

async function getClinicsWithVetsAndSchedule() {
  try {
    const clinics = await query(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM vets WHERE clinic_id = c.clinic_id) as vet_count
      FROM clinics c
    `);

    const clinicsWithDetails = await Promise.all(
      clinics.map(async (clinic: any) => {
        const [vets, schedule] = await Promise.all([
          query(`
            SELECT v.*, s.spec_description 
            FROM vets v
            LEFT JOIN specialisations s ON v.spec_id = s.spec_id
            WHERE v.clinic_id = ?
          `, [clinic.clinic_id]),
          
          query(`
            SELECT * FROM schedule_configs 
            WHERE clinic_id = ?
            ORDER BY day_of_week ASC
          `, [clinic.clinic_id])
        ]);

        return { ...clinic, vets, schedule };
      })
    );

    return clinicsWithDetails;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export default async function ClinicsPage() {
  const clinics = await getClinicsWithVetsAndSchedule();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Our Clinics</h1>
          
          {clinics.length === 0 ? (
            <div className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Tidak ada data klinik yang tersedia</span>
            </div>
          ) : (
            <div className="grid gap-8">
              {clinics.map((clinic) => (
                <div key={clinic.clinic_id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-2xl">
                      {clinic.clinic_name}
                      <div className="badge badge-primary">{clinic.vet_count} Dokter</div>
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {clinic.clinic_address}
                        </p>
                        
                        <p className="flex items-center gap-2 mt-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                          {clinic.clinic_phone}
                        </p>
                        
                        <div className="mt-6">
                          <ClinicMap mapHtml={clinic.maps} />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Jam Operasional</h3>
                        <div className="overflow-x-auto">
                          <table className="table table-zebra">
                            <thead>
                              <tr>
                                <th>Hari</th>
                                <th>Buka</th>
                                <th>Tutup</th>
                              </tr>
                            </thead>
                            <tbody>
                              {clinic.schedule.map((sched: any) => (
                                <tr key={sched.config_id}>
                                  <td>
                                    {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][sched.day_of_week]}
                                  </td>
                                  <td>{sched.open_time}</td>
                                  <td>{sched.close_time}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    
                    <div className="divider"></div>
                    
                    <h3 className="text-xl font-semibold">Dokter Kami</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {clinic.vets.map((vet: any) => (
                        <div key={vet.vet_id} className="card bg-base-200">
                          <div className="card-body">
                            <h4 className="card-title">
                              {vet.vet_title} {vet.vet_givenname} {vet.vet_familyname}
                              {vet.spec_description && (
                                <div className="badge badge-outline ml-2">{vet.spec_description}</div>
                              )}
                            </h4>
                            <p className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              Bergabung sejak {new Date(vet.vet_employed).toLocaleDateString('id-ID')}
                            </p>
                            <p className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                              </svg>
                              {vet.vet_phone}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}