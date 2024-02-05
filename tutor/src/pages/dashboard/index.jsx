import React from 'react';
import Card from "../../components/ui/Card";
import GroupChart1 from "../../components/partials/widget/chart/group-chart-1";

import HomeBredCurbs from './HomeBredCurbs';

import ParentList from './ParentList';

const Dashboard = () => {
  return (
    <div>
      <HomeBredCurbs title="Dashboard" />
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="2xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-4 col-span-1 gap-4">
              <GroupChart1 />
            </div>
          </Card>
        </div>
      </div>
      <div>
      <ParentList/>
      </div>
      
    </div>
  )
}

export default Dashboard;