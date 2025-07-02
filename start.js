#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🦷 DentalCare Pro - Starting Application...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required.');
  console.error(`   Current version: ${nodeVersion}`);
  console.error('   Please upgrade Node.js and try again.');
  process.exit(1);
}

// Check if dependencies are installed
const checkDependencies = () => {
  const serverNodeModules = path.join(__dirname, 'server', 'node_modules');
  const clientNodeModules = path.join(__dirname, 'client', 'node_modules');
  
  if (!fs.existsSync(serverNodeModules)) {
    console.error('❌ Server dependencies not installed.');
    console.error('   Run: cd server && npm install');
    return false;
  }
  
  if (!fs.existsSync(clientNodeModules)) {
    console.error('❌ Client dependencies not installed.');
    console.error('   Run: cd client && npm install');
    return false;
  }
  
  return true;
};

// Check if database exists, if not, offer to seed it
const checkDatabase = () => {
  const dbPath = path.join(__dirname, 'server', 'database', 'dental_clinic.db');
  
  if (!fs.existsSync(dbPath)) {
    console.log('📊 Database not found. Creating and seeding database...');
    
    const seedProcess = spawn('npm', ['run', 'seed'], {
      cwd: path.join(__dirname, 'server'),
      stdio: 'inherit',
      shell: true
    });
    
    seedProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Database created and seeded successfully!\n');
        startApplication();
      } else {
        console.error('❌ Failed to seed database');
        process.exit(1);
      }
    });
    
    return false; // Don't start app yet
  }
  
  return true; // Database exists, can start app
};

// Start the application
const startApplication = () => {
  console.log('🚀 Starting DentalCare Pro...');
  console.log('   Frontend: http://localhost:3000');
  console.log('   Backend:  http://localhost:5000');
  console.log('\n📋 Demo Credentials:');
  console.log('   Admin:        admin@dentalcare.com / admin123');
  console.log('   Dentist:      sarah.johnson@dentalcare.com / dentist123');
  console.log('   Receptionist: emily.davis@dentalcare.com / receptionist123');
  console.log('\n⏳ Starting servers...\n');
  
  const devProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down DentalCare Pro...');
    devProcess.kill('SIGINT');
    process.exit(0);
  });
  
  devProcess.on('close', (code) => {
    console.log(`\n🏁 DentalCare Pro stopped with code ${code}`);
    process.exit(code);
  });
};

// Main execution
const main = () => {
  if (!checkDependencies()) {
    process.exit(1);
  }
  
  if (checkDatabase()) {
    startApplication();
  }
  // If database doesn't exist, checkDatabase will handle seeding and then start the app
};

main();
