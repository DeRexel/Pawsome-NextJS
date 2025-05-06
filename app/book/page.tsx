// app/book/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type AnimalType = {
  at_id: number;
  at_description: string;
};

type Clinic = {
  clinic_id: number;
  clinic_name: string;
  clinic_address: string;
};

type Owner = {
  owner_id: number;
  owner_givenname: string;
  owner_familyname: string;
  owner_phone: string;
};

type Animal = {
  animal_id: number;
  animal_name: string;
  animal_born: string;
  animal_gender: string;
  at_id: number;
  owner_id: number;
};

type BookingConflict = {
  exists: boolean;
  conflictingBooking?: {
    booking_time: string;
    animal_name: string;
  };
};

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
  const [existingOwners, setExistingOwners] = useState<Owner[]>([]);
  const [existingAnimals, setExistingAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConflict, setBookingConflict] = useState<BookingConflict | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    clinic_id: '',
    owner_givenname: '',
    owner_familyname: '',
    owner_phone: '',
    animal_name: '',
    animal_born: '',
    animal_gender: '',
    at_id: '',
    booking_time: '',
    symptoms: '',
    visit_type: 'Medical Checkup',
    is_emergency: false,
  });

  const [conflictOwner, setConflictOwner] = useState<Owner | null>(null);
  const [token, setToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'getInitialData'
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch initial data');
        }
        
        const { clinics, animalTypes } = await response.json();
        setClinics(clinics);
        setAnimalTypes(animalTypes);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Check for existing owners when phone number changes
  useEffect(() => {
    if (formData.owner_phone.length >= 10) {
      const checkExistingOwners = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'checkOwners',
              data: { phone: formData.owner_phone }
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to check owners');
          }
          
          const { owners } = await response.json();
          setExistingOwners(owners);
        } catch (error) {
          console.error('Error checking owners:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      checkExistingOwners();
    }
  }, [formData.owner_phone]);

  // Check for existing animals when owner and animal name changes
  useEffect(() => {
    if (formData.owner_phone && formData.animal_name && existingOwners.length > 0) {
      const checkExistingAnimals = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'checkAnimals',
              data: {
                owner_id: existingOwners[0].owner_id,
                animal_name: formData.animal_name
              }
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to check animals');
          }
          
          const { animals } = await response.json();
          setExistingAnimals(animals);
        } catch (error) {
          console.error('Error checking animals:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      checkExistingAnimals();
    }
  }, [formData.owner_phone, formData.animal_name, existingOwners]);

  // Check for booking conflicts when booking time changes
  useEffect(() => {
    if (formData.booking_time && formData.clinic_id) {
      const checkBookingConflict = async () => {
        try {
          const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'checkBookingConflict',
              data: {
                clinic_id: formData.clinic_id,
                booking_time: formData.booking_time
              }
            }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to check booking conflicts');
          }
          
          const conflict = await response.json();
          setBookingConflict(conflict);
        } catch (error) {
          console.error('Error checking booking conflicts:', error);
        }
      };
      
      const debounceTimer = setTimeout(() => {
        checkBookingConflict();
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [formData.booking_time, formData.clinic_id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleOwnerConflict = (useExisting: boolean) => {
    if (conflictOwner && useExisting) {
      setFormData(prev => ({
        ...prev,
        owner_givenname: conflictOwner.owner_givenname,
        owner_familyname: conflictOwner.owner_familyname,
      }));
    }
    setConflictOwner(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final confirmation
    if (step === 4) {
      // Check for booking conflict first
      if (bookingConflict?.exists) {
        alert('Cannot book appointment. The selected time slot is already taken.');
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'createAppointment',
            data: {
              ...formData,
              existingOwnerId: existingOwners[0]?.owner_id,
              existingAnimalId: existingAnimals[0]?.animal_id
            }
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.error === 'BOOKING_CONFLICT') {
            setBookingConflict({
              exists: true,
              conflictingBooking: errorData.conflictingBooking
            });
            alert('Cannot book appointment. The selected time slot is already taken.');
            return;
          }
          throw new Error(errorData.message || 'Failed to create appointment');
        }
        
        const { token } = await response.json();
        setToken(token);
        setIsSuccess(true);
        setStep(5);
      } catch (error) {
        console.error('Error creating appointment:', error);
        alert('Failed to create appointment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Check for name conflict
      if (step === 1 && existingOwners.length > 0) {
        const sameNameOwner = existingOwners.find(
          o => o.owner_givenname === formData.owner_givenname && o.owner_familyname === formData.owner_familyname
        );
        
        if (!sameNameOwner) {
          setConflictOwner(existingOwners[0]);
          return;
        }
      }
      
      setStep(prev => prev + 1);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    alert('Token copied to clipboard!');
  };

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleString();
  };

  const resetForm = () => {
    setFormData({
      clinic_id: '',
      owner_givenname: '',
      owner_familyname: '',
      owner_phone: '',
      animal_name: '',
      animal_born: '',
      animal_gender: '',
      at_id: '',
      booking_time: '',
      symptoms: '',
      visit_type: 'Medical Checkup',
      is_emergency: false,
    });
    setStep(1);
    setToken('');
    setIsSuccess(false);
    setBookingConflict(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 px-4">
        <div className="max-w-4xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Book an Appointment</h1>
            <p className="text-lg">
              Fill out the form below to schedule an appointment for your pet.
            </p>
          </div>
          
          <div className="card bg-base-100 shadow-xl p-8">
            {isSuccess ? (
              <div className="space-y-6 text-center">
                <div className="alert alert-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Appointment booked successfully!</span>
                </div>
                
                <div className="bg-base-200 p-4 rounded-lg">
                  <p className="mb-2">Use this token to check your appointment status:</p>
                  <div className="flex items-center justify-center">
                    <code className="bg-neutral text-neutral-content px-4 py-2 rounded-lg mr-2">
                      {token}
                    </code>
                    <button 
                      onClick={copyToClipboard}
                      className="btn btn-sm"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="mt-4 text-sm">
                    If you lose this token, you can login using your phone number {formData.owner_phone} to check your appointment.
                  </p>
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-primary w-full"
                  onClick={resetForm}
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Clinic Selection */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Select Clinic</span>
                      </label>
                      <select 
                        name="clinic_id"
                        value={formData.clinic_id}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                        required
                        disabled={isLoading}
                      >
                        <option value="">Choose clinic</option>
                        {clinics.map(clinic => (
                          <option key={clinic.clinic_id} value={clinic.clinic_id}>
                            {clinic.clinic_name} - {clinic.clinic_address}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="btn btn-primary ml-2"
                        disabled={isLoading || !formData.clinic_id}
                      >
                        {isLoading ? 'Loading...' : 'Next'}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Owner Information */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">First Name</span>
                        </label>
                        <input
                          type="text"
                          name="owner_givenname"
                          value={formData.owner_givenname}
                          onChange={handleInputChange}
                          className="input input-bordered"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Last Name</span>
                        </label>
                        <input
                          type="text"
                          name="owner_familyname"
                          value={formData.owner_familyname}
                          onChange={handleInputChange}
                          className="input input-bordered"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="owner_phone"
                        value={formData.owner_phone}
                        onChange={handleInputChange}
                        className="input input-bordered"
                        required
                        disabled={isLoading}
                      />
                      {existingOwners.length > 0 && (
                        <label className="label">
                          <span className="label-text-alt text-info">
                            Phone number already registered
                          </span>
                        </label>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        type="button" 
                        className="btn"
                        onClick={() => setStep(1)}
                        disabled={isLoading}
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading || !formData.owner_givenname || !formData.owner_familyname || !formData.owner_phone}
                      >
                        {isLoading ? 'Loading...' : 'Next'}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Animal Information */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Pet Name</span>
                      </label>
                      <input
                        type="text"
                        name="animal_name"
                        value={formData.animal_name}
                        onChange={handleInputChange}
                        className="input input-bordered"
                        required
                        disabled={isLoading}
                      />
                      {existingAnimals.length > 0 && (
                        <label className="label">
                          <span className="label-text-alt text-info">
                            Pet with this name already registered
                          </span>
                        </label>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Date of Birth</span>
                        </label>
                        <input
                          type="date"
                          name="animal_born"
                          value={formData.animal_born}
                          onChange={handleInputChange}
                          className="input input-bordered"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Gender</span>
                        </label>
                        <select
                          name="animal_gender"
                          value={formData.animal_gender}
                          onChange={handleInputChange}
                          className="select select-bordered"
                          required
                          disabled={isLoading}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Animal Type</span>
                      </label>
                      <select
                        name="at_id"
                        value={formData.at_id}
                        onChange={handleInputChange}
                        className="select select-bordered"
                        required
                        disabled={isLoading}
                      >
                        <option value="">Select type</option>
                        {animalTypes.map(type => (
                          <option key={type.at_id} value={type.at_id}>
                            {type.at_description}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        type="button" 
                        className="btn"
                        onClick={() => setStep(2)}
                        disabled={isLoading}
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading || !formData.animal_name || !formData.animal_born || !formData.animal_gender || !formData.at_id}
                      >
                        {isLoading ? 'Loading...' : 'Next'}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Appointment Details */}
                {step === 4 && (
                  <div className="space-y-4">
                    {bookingConflict?.exists && (
                      <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          Time slot already booked for {bookingConflict.conflictingBooking?.animal_name} at {formatDateTime(bookingConflict.conflictingBooking?.booking_time || '')}
                        </span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Appointment Date & Time</span>
                        </label>
                        <input
                          type="datetime-local"
                          name="booking_time"
                          value={formData.booking_time}
                          onChange={handleInputChange}
                          className="input input-bordered"
                          required
                          disabled={isLoading}
                        />
                        {bookingConflict?.exists && (
                          <label className="label">
                            <span className="label-text-alt text-error">
                              Please choose a different time
                            </span>
                          </label>
                        )}
                      </div>
                      
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Visit Type</span>
                        </label>
                        <select
                          name="visit_type"
                          value={formData.visit_type}
                          onChange={handleInputChange}
                          className="select select-bordered"
                          required
                          disabled={isLoading}
                        >
                          <option value="Medical Checkup">Medical Checkup</option>
                          <option value="Home Visit">Home Visit</option>
                          <option value="Scaling">Scaling</option>
                          <option value="Sterilisasi">Sterilisasi</option>
                          <option value="Vaksinasi">Vaksinasi</option>
                          <option value="Bedah Mayor">Bedah Mayor</option>
                          <option value="Bedah Minor">Bedah Minor</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Symptoms</span>
                      </label>
                      <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered h-24"
                        placeholder="Describe your pet's symptoms..."
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Emergency Case</span>
                        <input
                          type="checkbox"
                          name="is_emergency"
                          checked={formData.is_emergency}
                          onChange={handleInputChange}
                          className="checkbox checkbox-primary"
                          disabled={isLoading}
                        />
                      </label>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        type="button" 
                        className="btn"
                        onClick={() => setStep(3)}
                        disabled={isLoading}
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading || bookingConflict?.exists || !formData.booking_time}
                      >
                        {isLoading ? 'Processing...' : 'Confirm Appointment'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}