import { updateUser } from '@/apis/userApi';
import { useAppSelector } from '@/app/hooks';
import { User } from '@/app/page';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateUserModalProps {
  user: User;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  const { token } = useAppSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!token) return;
    setIsLoading(true);

    try {
      await updateUser(token, user.id, { name, email, address });
      toast.success('User updated successfully');
      onUpdate();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen p-4 text-center'>
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg font-medium leading-6 text-gray-900'
                  id='modal-headline'
                >
                  Update User
                </h3>
                <div className='mt-2'>
                  <Input
                    label='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label='Email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse gap-5'>
            <Button
              onClick={handleUpdate}
              disabled={isLoading}
              className='ml-2'
            >
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
