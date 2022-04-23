import style from './project.module.css';
import card from '../card/card.module.css';

import { Card } from '../card/card.component';
import { NoResults } from '../NoResults';

export const PackageContainer = ({ packages }) => {
  return (
    <section>
      <h1 id="my-packages">My packages</h1>

      <div className={style.projectGrid}>
        {packages.length > 0 ? (
          packages.map((pck) => <Package data={pck} />)
        ) : (
          <NoResults text="No packages found" />
        )}
      </div>
    </section>
  );
};

export const Package = ({ data }) => {
  return (
    <Card key={data.package.name}>
      <p className={card.cardTitle} style={{ textAlign: 'center' }}>
        <a href={data.package.links.npm} className="no-link">
          {data.package.name} v{data.package.version}
        </a>
      </p>
    </Card>
  );
};
