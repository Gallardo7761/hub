import License from '@/components/License';

const Footer = () => {
  return (
    <div className='position-absolute bottom-0 justify-content-center w-100 p-3'>
      <footer className="text-center">
        <License work="miarma.net" workLink="https://miarma.net/" />
      </footer>
    </div>
  );
};

export default Footer;