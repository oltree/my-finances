import { FC, memo, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { useCategoties } from '../../../hooks/useCategories';
import { useUser } from '../../../hooks/useUser';
import { CategoryService } from '../../../services/category';
import { TransactionService } from '../../../services/transaction';
import { getCategories } from '../../../store/slices/categories';
import { getTransactions } from '../../../store/slices/transactions';
import { Modal } from '../../ui/modal';
import styles from './transactions.module.scss';

export const Transactions: FC = memo(() => {
  // use custom hook and divide into components
  const dispatch = useAppDispatch();
  // const { transactions } = useTransactions();
  const { categories } = useCategoties();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('income');
  const user = useUser();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleAddCategory = async (title: string) => {
    await CategoryService.create(user?.id || '', title);
    dispatch(getCategories());
  };

  const handleAddTransaction = async () => {
    await TransactionService.create({
      id: user?.id || '',
      title,
      amount,
      category,
      type,
    });
    dispatch(getTransactions());
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.flexContainerColumn}>
          <input
            type='text'
            placeholder='Title...'
            name='title'
            required
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            type='text'
            placeholder='Amount...'
            name='amount'
            required
            className={styles.input}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />

          <div className={styles.flexContainer}>
            <select
              name='categories'
              value={category}
              className={styles.input}
              onChange={e => setCategory(e.target.value)}
            >
              <option value=''>Select category</option>

              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>

            <button
              className={styles.button}
              onClick={() => setShowModal(!showModal)}
            >
              Add category
            </button>
          </div>

          <div className={styles.flexContainer}>
            <label>
              <input
                type='radio'
                value='income'
                checked={type === 'income'}
                onChange={e => setType(e.target.value)}
              />
              Income
            </label>

            <label>
              <input
                type='radio'
                value='expense'
                checked={type === 'expense'}
                onChange={e => setType(e.target.value)}
              />
              Expense
            </label>
          </div>

          <button className={styles.button} onClick={handleAddTransaction}>
            Add transaction
          </button>
        </div>
      </div>

      {showModal ? (
        <Modal
          onSubmit={handleAddCategory}
          onToggleModal={() => setShowModal(!showModal)}
        />
      ) : null}
    </>
  );
});
