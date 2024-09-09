import postgres from 'postgres';

export async function GET(request: Request) {
  console.log(request.headers.get('token'))
  return Response.json({
    data: 'Hello World',
  });
//   try {
//     const sql = postgres(`${process.env.DATABASE_URL}`)

//     const response = await sql`WITH user_cte AS (
//     SELECT id AS user_id
//     FROM users
//     WHERE clerk_id = 'user_2kvsjiZy3c7hTWQPwHafmyYImPo' 
// )
// SELECT c.*
// FROM categories c
// JOIN user_cte u ON c.user_id = u.user_id;
// `;

//     return Response.json({
//       data: response,
//     });
//   } catch (error) {
//     console.log(error);
//     return Response.json({
//       error: error,
//     });
//   }
} 