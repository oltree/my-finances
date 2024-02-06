import { FC, memo, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { useCategoties } from '../../../hooks/useCategories';
import { useTransactions } from '../../../hooks/useTransactions';
import { useUser } from '../../../hooks/useUser';
import { CategoryService } from '../../../services/category';
import { getCategories } from '../../../store/slices/categories';
import { getTransactions } from '../../../store/slices/transactions';
import { Modal } from '../../ui/modal';

export const Transactions: FC = memo(() => {
  const dispatch = useAppDispatch();
  const { transactions } = useTransactions();
  const { categories } = useCategoties();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('income');
  const user = useUser();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  console.log('transactions', transactions);

  const handleAddCategory = async (title: string) => {
    await CategoryService.create(user?.id || '', title);
    dispatch(getCategories());
  };

  return (
    <>
      <div>
        <div>
          <div>
            <input
              type='text'
              placeholder='Title...'
              name='title'
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              type='number'
              placeholder='Amount...'
              name='amount'
              required
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
            />

            <select
              name='categories'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value=''>Select category</option>

              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>

            <button>Add category</button>

            <div>
              <label>
                <input
                  type='radio'
                  value='income'
                  checked={transactionType === 'income'}
                  onChange={e => setTransactionType(e.target.value)}
                />
                Income
              </label>

              <label>
                <input
                  type='radio'
                  value='expense'
                  checked={transactionType === 'expense'}
                  onChange={e => setTransactionType(e.target.value)}
                />
                Expense
              </label>
            </div>

            <button>add</button>
          </div>

          <div>
            <div>
              <div>
                <p>total income:</p>
                <p>100$</p>
              </div>

              <div>
                <p>total expense:</p>
                <p>100$</p>
              </div>
            </div>
          </div>

          <div>diagram</div>
        </div>

        <div>transactions table</div>
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
