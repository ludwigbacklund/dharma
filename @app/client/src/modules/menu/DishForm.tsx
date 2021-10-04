import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Input } from '../../components/Input';

const ImageNotice = styled.span`
  display: block;
  font-size: 14px;
  margin-top: -8px;
  color: #707070;
`;

const SaveButtonInput = styled.input`
  border: 1px solid #3a3a3a;
  background: white;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  margin-top: 8px;

  :hover {
    opacity: 0.5;
  }
`;

interface Dish {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
}

interface Props {
  dish: Dish;
  onSubmit: () => Promise<void>;
  className?: string;
}

export const DishForm = ({ dish, onSubmit, className }: Props) => {
  if (!dish) return null;

  return (
    <form className={className} onSubmit={onSubmit}>
      <Input
        {...register('name', { required: 'Name is required' })}
        type='text'
        name='name'
        label='Name'
      />
      <Input
        {...register('description')}
        tag='textarea'
        type='text'
        name='description'
        label='Description'
        optional
      />
      <Input
        {...register('imageUrl')}
        type='text'
        name='imageUrl'
        label='Image URL'
        optional
      />
      <ImageNotice>Please use a images.pexels.com image URL.</ImageNotice>
      {isDirty && <SaveButtonInput type='submit' value='Save' />}
    </form>
  );
};
