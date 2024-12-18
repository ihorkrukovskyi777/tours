
interface BookingsAdditionalDto  {
    booking_id: string,
    type: string
}
export async function fetchBookingsAdditional (booking: BookingsAdditionalDto[]): Promise<string> {


    let response = await fetch(
        `${process.env.NEXT_PUBLIC_NEST_API}/api/v1/checkout/additional-orders`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bookings: booking}),
            next: {revalidate: 0}
        }
    )

    if(!response.ok) {
        throw new Error()
    }

    const data = await response.json() as { id: string }
    return data.id ;
}