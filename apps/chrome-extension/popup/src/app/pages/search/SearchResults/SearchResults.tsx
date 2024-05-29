import { useRecoilState, useRecoilValue } from 'recoil';
import StoreCard from '../../../components/StoreCard/StoreCard';
import {
  searchPopularProducts,
  searchPopularStores,
  searchProducts,
  searchStore,
  searchText,
} from '../../../recoil';
import styles from './index.module.css';
import { ProductCard } from '../../../components/ProductCard/ProductCard';

export function SearchResults() {
  const searchedStores = useRecoilValue(searchStore);
  const searchedProducts = useRecoilValue(searchProducts);
  const stores = useRecoilValue(searchPopularStores);
  const products = useRecoilValue(searchPopularProducts);
  const [searchTxt] = useRecoilState(searchText);

  return (
    <div className="px-4">
      <div className={`scrollbar-hide ${styles['main']}`}>
        {searchTxt === '' && (
          <div>
            <h2 className={styles['title']}>
              {chrome.i18n.getMessage('homePageTitle2')}
            </h2>
            <div className={styles['container']}>
              {stores.map((store, i) => (
                <StoreCard store={store} key={i} />
              ))}
            </div>
          </div>
        )}

        {searchTxt === '' && (
          <div>
            <h2 className={styles['title']}>
              {chrome.i18n.getMessage('homePageTitle6')}
            </h2>
            <div className={styles['container']}>
              {products.map((product, i) => (
                <ProductCard
                  size="small"
                  key={`product-${i}`}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}

        {searchTxt !== '' && searchedStores.length !== 0 && (
          <div>
            <h2 className={styles['title']}>
              {`${chrome.i18n.getMessage('searchStoresResult')} '${searchTxt}'`}
            </h2>
            <div className={styles['container']}>
              {searchedStores.map((store, i) => (
                <StoreCard store={store} key={i} />
              ))}
            </div>
          </div>
        )}

        {searchTxt !== '' && searchedProducts.length !== 0 && (
          <div>
            <h2 className={styles['title']}>
              {`${chrome.i18n.getMessage(
                'searchProductsResult'
              )} '${searchTxt}'`}
            </h2>
            <div className={styles['container']}>
              {searchedProducts.map((product, i) => (
                <ProductCard
                  size="small"
                  key={`product-${i}`}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}
        {searchTxt !== '' &&
          searchedProducts.length === 0 &&
          searchedStores.length === 0 && (
            <div className={styles['container']}>
              <div className="text-center">
                <h3 className="font-PPNeueMachina text-black text-lg">
                  No result founds
                </h3>
                <p className="font-InterRegular text-secondary text-xs">
                  Try searching for something else
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
