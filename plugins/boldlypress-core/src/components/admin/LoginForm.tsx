import * as React from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useAdmin } from 'react-authless-admin';

export interface LoginFormProps {}

export default function LoginForm(props: LoginFormProps) {
  const [passcode, setPasscode] = React.useState('');
  const [, setIsAdmin] = useAdmin();
  const handleLogin = (): void => {
    if (passcode.toLowerCase() === 'rocketship') {
      setIsAdmin(true);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Card.Text>
            <div style={{ marginTop: '20px', marginBottom: '10px' }}>
              <Form.Control
                type="text"
                placeholder="Passcode"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleLogin}>Submit</Button>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
