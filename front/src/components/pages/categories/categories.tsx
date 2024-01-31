import { FC, memo, useEffect, useState } from 'react';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';

import { useAppDispatch } from '../../../hooks/hooks';
import { useCategoties } from '../../../hooks/useCategories';
import { getCategories } from '../../../store/thunks/categoties';
import { Modal } from '../../ui/modal';
import styles from './categories.module.scss';

export const Categories: FC = memo(() => {
  const dispatch = useAppDispatch();
  const { categories } = useCategoties();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  console.log('categories', categories);

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Your category list:</h1>

        <div>
          <div>
            Salary
            <div>
              <button>
                <AiFillEdit />
              </button>

              <button>
                <AiFillCloseCircle />
              </button>
            </div>
          </div>
        </div>

        <button onClick={() => setShowModal(!showModal)}>
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>

      {showModal ? (
        <Modal
          onSubmit={() => {}}
          onToggleModal={() => setShowModal(!showModal)}
        />
      ) : null}
    </>
  );
});
