// app/schedule/page.tsx
import { query } from "@/database/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmptyState from "@/components/EmptyState";

async function getConfirmedBookings(period: string = 'day') {
  let dateFilter = '';
  const now = new Date();
  
  if (period === 'day') {
    const start = new Date(now.setHours(0, 0, 0, 0));
    const end = new Date(now.setHours(23, 59, 59, 999));
    dateFilter = `AND booking_time BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`;
  } else if (period === 'week') {
    const start = new Date(now.setDate(now.getDate() - now.getDay()));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    dateFilter = `AND booking_time BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`;
  } else if (period === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    dateFilter = `AND booking_time BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`;
  }

  try {
    const sql = `
      SELECT gb.booking_id, gb.booking_time, gb.visit_type, 
             a.animal_name, a.animal_gender,
             o.owner_givenname, o.owner_familyname
      FROM guest_bookings gb
      LEFT JOIN animals a ON gb.animal_id = a.animal_id
      LEFT JOIN owners o ON gb.owner_id = o.owner_id
      WHERE gb.status = 'confirmed'
      ${dateFilter}
      ORDER BY gb.booking_time ASC
    `;
    
    const bookings = await query(sql);
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Failed to load schedule data');
  }
}

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: { period: string };
}) {
  const period = searchParams.period || 'day';
  let bookings = [];
  let error = null;

  try {
    bookings = await getConfirmedBookings(period);
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 px-4">
        <div className="max-w-6xl mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Appointment Schedule</h1>
          
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <a 
              href="/schedule?period=day" 
              className={`btn ${period === 'day' ? 'btn-primary' : 'btn-outline'}`}
            >
              Today
            </a>
            <a 
              href="/schedule?period=week" 
              className={`btn ${period === 'week' ? 'btn-primary' : 'btn-outline'}`}
            >
              This Week
            </a>
            <a 
              href="/schedule?period=month" 
              className={`btn ${period === 'month' ? 'btn-primary' : 'btn-outline'}`}
            >
              This Month
            </a>
          </div>
          
          {error ? (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="bg-base-200">Time</th>
                    <th className="bg-base-200">Animal</th>
                    <th className="bg-base-200">Owner</th>
                    <th className="bg-base-200">Service</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((booking: any) => (
                      <tr key={booking.booking_id} className="hover:bg-base-200">
                        <td>
                          {new Date(booking.booking_time).toLocaleString()}
                        </td>
                        <td>
                          {booking.animal_name} ({booking.animal_gender})
                        </td>
                        <td>
                          {booking.owner_givenname} {booking.owner_familyname}
                        </td>
                        <td>{booking.visit_type}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-8">
                        <EmptyState 
                          title="No bookings found"
                          description={`There are no confirmed bookings for this ${period}.`}
                          icon="📅"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}