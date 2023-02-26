import { Link } from 'react-router-dom';

import './DemoAccounts.scss';

const DemoAccounts = () => (
  <div className="demo-acct-info">
    <h3 className='demo-h3'>Demo Accounts:</h3>
    <table>
      <tbody>
        <tr><td>📧: <span className="deets">demo@example.com</span></td><td className='usr-acct-pwd'>🔑🔒: <span className="deets">123456</span></td></tr>
        <tr><td>📧: <span className="deets">foo@example.com</span></td><td className='usr-acct-pwd'>🔑🔒: <span className="deets">123456</span></td></tr>
        {/* <tr><td>📧: <span className="deets">bar@example.com</span></td><td className='usr-acct-pwd'>🔑🔒: <span className="deets">123456</span></td></tr> */}
      </tbody>
    </table>
    <p className='usr-acct-warn'>(Or you <em>can <Link to="/signup" className="">signup as a new user...</Link></em>)</p>
  </div>
)

export default DemoAccounts;
