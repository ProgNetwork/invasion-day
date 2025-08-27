// Test script to simulate pledge form submission
// Run with: node test-pledge-api.js

const testPledgeSubmission = async () => {
  const testData = {
    givenName: 'John',
    familyName: 'Doe',
    email: 'john.doe@example.com',
    postcode: '3000',
    phone: '0412345678',
    firstNationsIdentifying: false,
    sourceCode: 'pledge_signature_website',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'treaty_pledge_test',
    utmTerm: 'treaty australia',
    utmContent: 'test_banner'
  };

  try {
    console.log('🚀 Testing pledge form submission...');
    console.log('📊 Test data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/actionnetwork-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('📡 Response status:', response.status);
    console.log('📄 Response body:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ SUCCESS: Pledge submitted successfully!');
      console.log('🎯 This would create a new activist in Action Network with:');
      console.log('   - Tag: pledge_signature_website');
      console.log('   - UTM parameters stored as custom fields');
      console.log('   - GTM event: pledge_signup');
    } else {
      console.log('❌ ERROR: Pledge submission failed');
      console.log('💡 Check your Action Network API key and custom fields setup');
    }
    
  } catch (error) {
    console.error('💥 Network error:', error.message);
    console.log('💡 Make sure your Next.js dev server is running on port 3000');
  }
};

// Run the test
testPledgeSubmission();
