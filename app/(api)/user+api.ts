import postgres from 'postgres';

export async function POST(req: Request) {
  try {
    const sql = postgres(`${process.env.DATABASE_URL}`)
    const { name, email, clerkId } = await req.json();

    if (!name || !email || !clerkId) {
      return Response.json("Missing required fields", { status: 400 });
    }

    const responde = await sql`
    INSERT INTO users (name, email, clerk_id)
    VALUES (${name}, ${email}, ${clerkId})
  `;

    return new Response(JSON.stringify({ data: responde }), { status: 201 });
  } catch (error) {
    console.error('errorLog', error);
    return Response.json("Internal server error", { status: 500 });
  }
}