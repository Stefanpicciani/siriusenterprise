// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useAuthStore } from '../store/auth-store';
// import { User, Lock, MapPin, Package, Phone, Mail } from 'lucide-react';
// import OrderTimeline from '../components/OrderTimeline';

// const accountTabs = [
//   { id: 'personal', name: 'Dados Pessoais', icon: User },
//   { id: 'security', name: 'Dados de Acesso', icon: Lock },
//   { id: 'addresses', name: 'Livro de Endereços', icon: MapPin },
//   { id: 'orders', name: 'Minhas Encomendas', icon: Package },
// ];

// const personalDataSchema = z.object({
//   firstName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
//   lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
//   email: z.string().email('Email inválido'),
//   phone: z.string().min(9, 'Telefone inválido'),
// });

// const securitySchema = z.object({
//   currentPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
//   newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
//   confirmPassword: z.string()
// }).refine((data) => data.newPassword === data.confirmPassword, {
//   message: "As senhas não coincidem",
//   path: ["confirmPassword"],
// });

// const addressSchema = z.object({
//   name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
//   street: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
//   city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
//   postalCode: z.string().min(4, 'Código postal inválido'),
//   country: z.string().min(2, 'País deve ter pelo menos 2 caracteres'),
//   phone: z.string().min(9, 'Telefone inválido'),
//   isDefault: z.boolean().optional(),
//   isBilling: z.boolean().optional(),
// });

// type PersonalDataForm = z.infer<typeof personalDataSchema>;
// type SecurityForm = z.infer<typeof securitySchema>;
// type AddressForm = z.infer<typeof addressSchema>;

// const Account = () => {
//   const [activeTab, setActiveTab] = useState('personal');
//   const { user, updateProfile, updatePassword, addAddress, addresses, orders } = useAuthStore();
//   const navigate = useNavigate();

//   const personalForm = useForm<PersonalDataForm>({
//     resolver: zodResolver(personalDataSchema),
//     defaultValues: {
//       firstName: user?.name.split(' ')[0] || '',
//       lastName: user?.name.split(' ').slice(1).join(' ') || '',
//       email: user?.email || '',
//       phone: user?.phone || '',
//     },
//   });

//   const securityForm = useForm<SecurityForm>({
//     resolver: zodResolver(securitySchema),
//   });

//   const addressForm = useForm<AddressForm>({
//     resolver: zodResolver(addressSchema),
//   });

//   const onPersonalSubmit = async (data: PersonalDataForm) => {
//     try {
//       await updateProfile({
//         name: `${data.firstName} ${data.lastName}`,
//         email: data.email,
//         phone: data.phone,
//       });
//       // Show success message
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//     }
//   };

//   const onSecuritySubmit = async (data: SecurityForm) => {
//     try {
//       await updatePassword(data.currentPassword, data.newPassword);
//       securityForm.reset();
//       // Show success message
//     } catch (error) {
//       console.error('Failed to update password:', error);
//     }
//   };

//   const onAddressSubmit = async (data: AddressForm) => {
//     try {
//       await addAddress(data);
//       addressForm.reset();
//       // Show success message
//     } catch (error) {
//       console.error('Failed to add address:', error);
//     }
//   };

//   const renderPersonalData = () => (
//     <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-6">
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Nome</label>
//           <input
//             type="text"
//             {...personalForm.register('firstName')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//           {personalForm.formState.errors.firstName && (
//             <p className="mt-2 text-sm text-red-600">{personalForm.formState.errors.firstName.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
//           <input
//             type="text"
//             {...personalForm.register('lastName')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//           {personalForm.formState.errors.lastName && (
//             <p className="mt-2 text-sm text-red-600">{personalForm.formState.errors.lastName.message}</p>
//           )}
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Email</label>
//         <input
//           type="email"
//           {...personalForm.register('email')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//         {personalForm.formState.errors.email && (
//           <p className="mt-2 text-sm text-red-600">{personalForm.formState.errors.email.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Telefone</label>
//         <input
//           type="tel"
//           {...personalForm.register('phone')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//         {personalForm.formState.errors.phone && (
//           <p className="mt-2 text-sm text-red-600">{personalForm.formState.errors.phone.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Salvar Alterações
//       </button>
//     </form>
//   );

//   const renderSecurity = () => (
//     <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Senha Atual</label>
//         <input
//           type="password"
//           {...securityForm.register('currentPassword')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//         {securityForm.formState.errors.currentPassword && (
//           <p className="mt-2 text-sm text-red-600">{securityForm.formState.errors.currentPassword.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Nova Senha</label>
//         <input
//           type="password"
//           {...securityForm.register('newPassword')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//         {securityForm.formState.errors.newPassword && (
//           <p className="mt-2 text-sm text-red-600">{securityForm.formState.errors.newPassword.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
//         <input
//           type="password"
//           {...securityForm.register('confirmPassword')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//         />
//         {securityForm.formState.errors.confirmPassword && (
//           <p className="mt-2 text-sm text-red-600">{securityForm.formState.errors.confirmPassword.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Alterar Senha
//       </button>
//     </form>
//   );

//   const renderAddresses = () => (
//     <div className="space-y-6">
//       <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-6">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Nome</label>
//             <input
//               type="text"
//               {...addressForm.register('name')}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Telefone</label>
//             <input
//               type="tel"
//               {...addressForm.register('phone')}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Endereço</label>
//           <input
//             type="text"
//             {...addressForm.register('street')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Cidade</label>
//             <input
//               type="text"
//               {...addressForm.register('city')}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Código Postal</label>
//             <input
//               type="text"
//               {...addressForm.register('postalCode')}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">País</label>
//           <input
//             type="text"
//             {...addressForm.register('country')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               {...addressForm.register('isDefault')}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <span className="ml-2 text-sm text-gray-600">Endereço principal</span>
//           </label>

//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               {...addressForm.register('isBilling')}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <span className="ml-2 text-sm text-gray-600">Endereço de faturação</span>
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Adicionar Endereço
//         </button>
//       </form>

//       <div className="mt-8">
//         <h3 className="text-lg font-medium text-gray-900">Endereços Salvos</h3>
//         <div className="mt-4 grid grid-cols-1 gap-4">
//           {addresses.map((address) => (
//             <div
//               key={address.id}
//               className="border rounded-lg p-4 flex justify-between items-start"
//             >
//               <div>
//                 <p className="font-medium">{address.name}</p>
//                 <p className="text-sm text-gray-600">{address.street}</p>
//                 <p className="text-sm text-gray-600">
//                   {address.city}, {address.postalCode}
//                 </p>
//                 <p className="text-sm text-gray-600">{address.country}</p>
//                 <p className="text-sm text-gray-600">{address.phone}</p>
//                 {address.isDefault && (
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     Principal
//                   </span>
//                 )}
//                 {address.isBilling && (
//                   <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                     Faturação
//                   </span>
//                 )}
//               </div>
//               <button
//                 onClick={() => {/* Handle address deletion */}}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 Remover
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   const renderOrders = () => (
//     <div className="space-y-8">
//       <h3 className="text-lg font-medium text-gray-900">Minhas Encomendas</h3>
      
//       {orders?.length === 0 ? (
//         <p className="text-gray-600">Você ainda não tem nenhuma encomenda.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders?.map((order) => (
//             <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h4 className="text-lg font-medium">Encomenda #{order.id}</h4>
//                     <p className="text-sm text-gray-600">
//                       {new Date(order.createdAt).toLocaleDateString('pt-BR')}
//                     </p>
//                   </div>
//                   <div className="flex items-center">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       order.status === 'delivered' ? 'bg-green-100 text-green-800' :
//                       order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
//                       order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
//                       order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {order.status === 'delivered' ? 'Entregue' :
//                        order.status === 'shipped' ? 'Em Trânsito' :
//                        order.status === 'processing' ? 'Em Processamento' :
//                        order.status === 'cancelled' ? 'Cancelado' :
//                        'Pendente'}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="border-t border-b border-gray-200 py-4 my-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">Total</p>
//                       <p className="mt-1 text-lg font-medium text-gray-900">
//                         {order.total.toLocaleString('pt-BR', {
//                           style: 'currency',
//                           currency: 'EUR'
//                         })}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-500">Entrega Estimada</p>
//                       <p className="mt-1 text-lg font-medium text-gray-900">
//                         {order.estimatedDeliveryDate ? 
//                           new Date(order.estimatedDeliveryDate).toLocaleDateString('pt-BR') :
//                           'A confirmar'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {order.trackingNumber && (
//                   <div className="mb-4">
//                     <p className="text-sm font-medium text-gray-500">
//                       Número de Rastreio: {order.trackingNumber}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Transportadora: {order.carrier}
//                     </p>
//                   </div>
//                 )}

//                 <div className="mt-6">
//                   <h5 className="text-sm font-medium text-gray-900 mb-4">
//                     Atualizações da Encomenda
//                   </h5>
//                   <OrderTimeline updates={order.shipmentUpdates} />
//                 </div>

//                 {order.status === 'failed_delivery' && (
//                   <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
//                     <div className="flex">
//                       <div className="flex-shrink-0">
//                         <Phone className="h-5 w-5 text-red-400" />
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium text-red-800">
//                           Tentativa de entrega falhou
//                         </h3>
//                         <div className="mt-2 text-sm text-red-700">
//                           <p>
//                             Nossa equipe tentará entrar em contato para reagendar a entrega.
//                             Por favor, mantenha seus dados de contato atualizados.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//       <div className="md:grid md:grid-cols-3 md:gap-6">
//         <div className="md:col-span-1">
//           <div className="px-4 sm:px-0">
//             <h3 className="text-lg font-medium leading-6 text-gray-900">Minha Conta</h3>
//             <p className="mt-1 text-sm text-gray-600">
//               Gerencie suas informações pessoais e preferências
//             </p>
//           </div>
//           <nav className="mt-5 space-y-1">
//             {accountTabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`${
//                     activeTab === tab.id
//                       ? 'bg-blue-50 border-blue-500 text-blue-700'
//                       : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                   } flex items-center w-full px-3 py-2 text-sm font-medium border-l-4`}
//                 >
//                   <Icon
//                     className={`${
//                       activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'
//                     } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
//                   />
//                   <span className="truncate">{tab.name}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         <div className="mt-5 md:mt-0 md:col-span-2">
//           <div className="shadow sm:rounded-md sm:overflow-hidden">
//             <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
//               {activeTab === 'personal' && renderPersonalData()}
//               {activeTab === 'security' && renderSecurity()}
//               {activeTab === 'addresses' && renderAddresses()}
//               {activeTab === 'orders' && renderOrders()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;