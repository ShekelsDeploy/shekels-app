import { TextInput } from "../../../components/utils/Input";
import defaultImg from '../../../assets/images/defaultImg.jpg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { onlyLetters } from "../../../services/validation/validation";
import { ButtonStylePrimary } from "../../../assets/class-styles";
import { useMemo, useState } from "react";
import { BASE_URL } from "services/utils/config";
import { updateAvatar, updateUserInfo } from "services/users/users";
import { updateNameLastName } from "services/person/person";
const schema = yup.object({
   name: onlyLetters({ required: true, minSize: 3 }),
   lastName: onlyLetters({ required: true, minSize: 3 })
});
function UserEdit({ data }: any) {
   const { handleSubmit, getValues, register, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schema), // Resolver especial para useForm recibe el esquema de yup
      mode: "all",// Cuando se hacen las validaciones
   });
   const [file, setFile] = useState(defaultImg);
   const [historyFile, setHistoryFile] = useState('');
   const [saveFile, setSaveFile] = useState('');
   useMemo(() => {
      setFile(BASE_URL + data.file)
      setHistoryFile(data.file)
      reset(data)
   }, [data]);

   function fileHandler(event: any) {
      if (event.target.files && event.target.files[0]) {
         setFile(URL.createObjectURL(event.target.files[0]));
         setSaveFile(event.target.files[0]);
      }
   }
   function updateAvater() {
      let formData = new FormData();
      formData.append("file", saveFile);
      formData.append("url-another", historyFile);
      formData.append("id", localStorage.getItem("storage_id") as string);
      updateAvatar(formData).then((res) => {
         console.log(res);
      });
   }
   function renderUpdateAvatar() {
      if (data.approvedStatus === 'REJECTED') {
         return <>
            <label
               htmlFor="fileInput"

               className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24" stroke="gray" fill="none">
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                  <circle cx="12" cy="13" r="3" />
               </svg>
               Buscar Imagen
            </label>
            <button onClick={updateAvatar} className="bg-blue-500 p-2 ml-2 rounded"><i className="fa-solid fa-floppy-disk text-white"></i></button>
            <div className="mx-auto pt-2 w-48 text-gray-500 text-xs text-center mt-1">Click to add profile picture</div>
            <input onChange={fileHandler} name="photo" id="fileInput" accept="image/*" className="hidden" type="file" ></input>
         </>
      }
   }
   function updateData() {
      const data = {
         name: getValues("name"),
         lastName: getValues("lastName"),
         id: localStorage.getItem('storage_id')
      }
      updateNameLastName(data).then((res) => {
         console.log(res);
      });
   }
   return (
      <>
         <h2 className="mb-4 text-lg">Editar Datos de Usuario</h2>
         <form>
            <div className="md:mb-5 text-center">
               <div className="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                  <img id="image" className="object-cover w-full h-32 rounded-full" src={file} />
               </div>
               {renderUpdateAvatar()}
               <div className="grid mt-10 mb-10 grid-cols-6 md:gap-6 gap-3">
                  <div className="col-span-6 sm:col-span-3">
                     <TextInput
                        id="name"
                        label="Nombre"
                        type="text"
                        placeholder="Escribe tu nombre"
                        register={{ ...register('name') }}
                        errorMessage={errors.name?.message}
                     />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                     <TextInput
                        id="lastName"
                        label="Apellido"
                        type="text"
                        placeholder="Escribe tu apellido"
                        register={{ ...register('lastName') }}
                        errorMessage={errors.lastName?.message}
                     />
                  </div>
               </div>
            </div>
            <div className='step-footer md:block'>
               <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button onClick={updateData} className={ButtonStylePrimary}>
                     Guardar
                  </button>
               </div>
            </div>
         </form>
      </>
   );
}

export default UserEdit;
