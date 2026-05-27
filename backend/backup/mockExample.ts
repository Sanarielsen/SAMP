// import { queryOptions } from "@tanstack/react-query"

//import { api } from "@/api/axios"

// export function optionsQueryListUsers(search: string) { 

//   console.log(search)
//   return queryOptions({
//     queryKey: ["users"],
//     queryFn: async () => {
//       await new Promise((resolve) =>
//         setTimeout(resolve, 5000)
//       );

//       return [
//         {
//           name: 'Teste',
//           email: 'teste@email.com',
//           ruleName: 'USER',
//           updatedAt: new Date(Date.now())
//         },
//         {
//           name: 'Teste 2',
//           email: 'teste2@email.com',
//           ruleName: 'ADMIN',
//           updatedAt: new Date(Date.now())
//         },
//         {
//           name: 'Teste 3',
//           email: 'teste3@email.com',
//           ruleName: 'USER',
//           updatedAt: new Date(Date.now())
//         },
//       ];
//     },
//   })
// }