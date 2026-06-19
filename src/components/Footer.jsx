import License from '@/components/License';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import '@/css/Footer.css';

const Footer = () => {
  return (
    <div className="terminal-wrapper">
      <div className="terminal-window">

        <div className="terminal-header">
          <div className="window-controls">
            <span className="control close"></span>
            <span className="control minimize"></span>
            <span className="control maximize"></span>
          </div>
          <div className="terminal-title">
            <FontAwesomeIcon icon={faTerminal} className="me-2 opacity-50" />
            <span className="status-dot" aria-hidden="true"></span>
            <span>root@heimdall:~</span>
          </div>
        </div>

        <div className="terminal-body">
          <div className="terminal-prompt">
            <span className="prompt-user">root@heimdall</span>
            <span className="prompt-sep">:</span>
            <span className="prompt-path">~/miarma.net</span>
            <span className="prompt-char">$</span>
            <span className="prompt-cmd">cat license.info</span>
          </div>

          <div className="terminal-output">
            <License work="miarma.net" workLink="https://miarma.net/" />
          </div>

          <div className="terminal-prompt mt-3">
            <span className="prompt-user">root@heimdall</span>
            <span className="prompt-sep">:</span>
            <span className="prompt-path">~/miarma.net</span>
            <span className="prompt-char">$</span>
            <span className="cursor-block"></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
