import { useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/molecules/LogoutButton";
import { Button } from "../components/atoms";

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div>
          <h2 className='text-2xl font-bold'>Bienvenido al dashboard</h2>
          <p className='text-gray-500'>Aquí puedes ver tus datos</p>
        </div>
        <LogoutButton />

        <div className="flex gap-4">
          <Button onClick={() => navigate('/profile')}>Ver perfil</Button>
          <Button onClick={() => navigate('/profile/edit')}>Editar perfil</Button>
        </div>
      </div>
    </>
  )
}
