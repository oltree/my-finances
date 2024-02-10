import { FC, memo, useEffect, useState } from 'react';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { useAppDispatch } from '../../../hooks/hooks';
import { useCategoties } from '../../../hooks/useCategories';
import { useUser } from '../../../hooks/useUser';
import { CategoryService } from '../../../services/category';
import { getCategories } from '../../../store/slices/categories';
import { Modal } from '../../ui/modal';
import styles from './categories.module.scss';

export const Categories: FC = memo(() => {
  // use custom hook and divide into components
  const dispatch = useAppDispatch();
  const { categories } = useCategoties();
  const user = useUser();

  const initialCategory = {
    id: '',
    title: '',
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleAddCategory = async (title: string) => {
    await CategoryService.create(user?.id || '', title);
    dispatch(getCategories());
  };

  const handleOpenEditModal = (id: string, title: string) => {
    setSelectedCategory({ id, title });
    setShowModal(!showModal);
  };

  const handleUpdateCategory = async (title: string) => {
    await CategoryService.update(selectedCategory.id, title);
    setSelectedCategory(initialCategory);
    dispatch(getCategories());
  };

  const handleDeleteCategory = async (id: string) => {
    await CategoryService.delete(id);
    dispatch(getCategories());
  };

  const handleModalSubmit =
    selectedCategory.title.length > 0
      ? handleUpdateCategory
      : handleAddCategory;

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Your category list:</h1>

        <div className={styles.categories}>
          {categories.map(category => (
            <div key={category.id} className={styles.category}>
              <p className={styles.categoryTitle}>{category.title}</p>

              <div className={styles.categoryButtons}>
                <button
                  className={styles.categoryButton}
                  onClick={() =>
                    handleOpenEditModal(category.id, category.title)
                  }
                >
                  <AiFillEdit />
                </button>
                <button
                  className={styles.categoryButton}
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <AiFillCloseCircle />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className={styles.button}
          onClick={() => setShowModal(!showModal)}
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>

      {showModal ? (
        <Modal
          title={selectedCategory.title}
          onSubmit={handleModalSubmit}
          onToggleModal={() => setShowModal(!showModal)}
        />
      ) : null}
    </>
  );
});
