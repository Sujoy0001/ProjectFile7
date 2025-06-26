import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: 'top-right',
    style: { backgroundColor: '#fff', color: '#2C3333' } 
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: 'top-right',
    style: { backgroundColor: '#fff', color: '#2C3333' } 
  });
};