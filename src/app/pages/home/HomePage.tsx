import { FC } from 'react';

import {
  ListsWidget6,
  TablesWidget5,
} from '../../../_metronic/partials/widgets';
import { HomeHeader } from './components';

const HomePage: FC = () => (
  <>
    <HomeHeader />

    <div className="col-xxl-8">
      <TablesWidget5 className="card-xxl-stretch mb-5 mb-xxl-8" />
    </div>
  </>
);

export default HomePage;
