import { FC } from 'react';

import { HomeHeader, HomeReportsList } from './components';

const HomePage: FC = () => (
  <div className="p-10">
    <HomeHeader />
    <HomeReportsList />
  </div>
);

export default HomePage;
