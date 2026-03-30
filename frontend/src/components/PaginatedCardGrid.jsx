import PropTypes from 'prop-types';
import LoadingIcon from '@/components/LoadingIcon.jsx';
import "@/css/PaginatedCardGrid.css"

const PaginatedCardGrid = ({
  items = [],
  renderCard,
  loaderRef,
  loading = false
}) => {
  return (
    <div className="cards-grid">

      {items.map((item, i) => renderCard(item, i))}

      <div ref={loaderRef} className="loading-trigger d-flex justify-content-center align-items-center">
        {loading && <LoadingIcon />}
      </div>
    </div>
  );
};

PaginatedCardGrid.propTypes = {
  items: PropTypes.array,
  renderCard: PropTypes.func.isRequired,
  creatingItem: PropTypes.any,
  renderCreatingCard: PropTypes.func,
  loaderRef: PropTypes.object,
  loading: PropTypes.bool
};

export default PaginatedCardGrid;
