import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
    }
  }
}

// import "@fastify/jwt";

// declare module "@fastify/jwt" {
//   interface FastifyJWT {
//     payload: {
//       roleId: string;
//       role: string;
//       level: number;
//     };

//     user: {
//       sub: string;

//       roleId: string;
//       role: string;
//       level: number;
//     };
//   }
// }