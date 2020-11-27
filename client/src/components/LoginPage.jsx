const LoginPage = () => (
  <div style={{
    height: '100vh', paddingTop: '10rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
  }}
  >
    <div className="ui icon header" style={{ paddingBottom: '2rem' }}>
      <i className="discord outline icon" />
      Juice Boy Playlists ©
    </div>
    <a href="/api/login"><div className="ui secondary button">Log In With Discord</div></a>
  </div>
);

export default LoginPage;
