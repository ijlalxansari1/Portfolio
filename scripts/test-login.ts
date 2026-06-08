import { loginAdmin } from '../app/utils/auth';

async function testLogin() {
  const token = await loginAdmin('admin', 'changeme123');
  console.log("Token received:", token);
  
  if (token) {
    console.log("Login SUCCESS!");
  } else {
    console.log("Login FAILED!");
  }
}

testLogin();
