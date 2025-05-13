import PropTypes from 'prop-types';

const License = ({ work, workLink }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <a href={workLink} target="_blank" rel="noopener noreferrer">{work}</a> © {currentYear} by{' '}
      <a href="https://gallardo.dev" target="_blank" rel="noopener noreferrer">Gallardo7761 (Jose)</a> is licensed under{' '}
      <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer">
        CC BY-NC-ND 4.0
      </a>
      <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="cc" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} />
      <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="by" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} />
      <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="nc" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} />
      <img src="https://mirrors.creativecommons.org/presskit/icons/nd.svg" alt="nd" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} />
    </>
  );
};

License.propTypes = {
    work: PropTypes.string.isRequired,
    workLink: PropTypes.string.isRequired,
};

export default License;
