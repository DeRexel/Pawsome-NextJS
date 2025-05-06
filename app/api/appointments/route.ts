import { query } from '@/database/config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    const { action, data } = requestData;

    switch (action) {
      case 'getInitialData':
        const [clinics, animalTypes] = await Promise.all([
          query('SELECT clinic_id, clinic_name, clinic_address FROM clinics'),
          query('SELECT at_id, at_description FROM animal_types'),
        ]);
        return NextResponse.json({ clinics, animalTypes });

      case 'checkOwners':
        const owners = await query(
          'SELECT owner_id, owner_givenname, owner_familyname, owner_phone FROM owners WHERE owner_phone = ?',
          [data.phone]
        );
        return NextResponse.json({ owners });

      case 'checkAnimals':
        const animals = await query(
          'SELECT animal_id, animal_name, animal_born, animal_gender, at_id FROM animals WHERE owner_id = ? AND animal_name = ?',
          [data.owner_id, data.animal_name]
        );
        return NextResponse.json({ animals });

      case 'createAppointment':
        // 1. Handle owner
        let ownerId;
        if (data.existingOwnerId) {
          ownerId = data.existingOwnerId;
        } else {
          const newOwner = await query(
            'INSERT INTO owners (owner_givenname, owner_familyname, owner_phone, is_guest, created_at, updated_at) VALUES (?, ?, ?, 1, NOW(), NOW())',
            [data.owner_givenname, data.owner_familyname, data.owner_phone]
          );
          ownerId = newOwner.insertId;
        }

        // 2. Handle animal
        let animalId;
        if (data.existingAnimalId) {
          animalId = data.existingAnimalId;
        } else {
          const newAnimal = await query(
            'INSERT INTO animals (animal_name, animal_born, animal_gender, at_id, owner_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
            [data.animal_name, data.animal_born, data.animal_gender, data.at_id, ownerId]
          );
          animalId = newAnimal.insertId;
        }

        // 3. Create booking
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        
        await query(
          'INSERT INTO guest_bookings (owner_id, animal_id, clinic_id, booking_time, symptoms, visit_type, is_emergency, status, token, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, "pending", ?, NOW(), NOW())',
          [ownerId, animalId, data.clinic_id, data.booking_time, data.symptoms, data.visit_type, data.is_emergency, token]
        );

        return NextResponse.json({ success: true, token });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Appointment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}