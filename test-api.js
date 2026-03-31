/* eslint-disable @typescript-eslint/no-require-imports */
// Test script to verify OpenAI API key works
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

console.log('🧪 Testing OpenAI API Key...\n');

if (!apiKey) {
  console.log('❌ No API key found');
  process.exit(1);
}

console.log('✅ API key found');
console.log(`🔑 Key: ${apiKey.substring(0, 20)}...`);

// Test with a simple API call
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey });

async function testAPI() {
  try {
    console.log('\n🔗 Testing API connection...');
    
    // Test 1: List models
    const models = await openai.models.list();
    console.log('✅ API connection successful!');
    console.log(`📊 Available models: ${models.data.length}`);
    
    // Test 2: Simple completion
    console.log('\n🤖 Testing simple completion...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'Hello, ResumeTransformer!' in exactly those words."
        }
      ],
      max_tokens: 10
    });
    
    const response = completion.choices[0].message.content;
    console.log('✅ Completion test successful!');
    console.log(`🤖 Response: "${response}"`);
    
    console.log('\n🎉 Your OpenAI integration is ready!');
    console.log('💡 You can now uncomment the real implementation in aiService.ts');
    
  } catch (error) {
    console.log('❌ API test failed:');
    console.log(`   ${error.message}`);
    
    if (error.message.includes('401')) {
      console.log('\n💡 Invalid API key. Please check your key at:');
      console.log('   https://platform.openai.com/api-keys');
    } else if (error.message.includes('429')) {
      console.log('\n💡 Rate limit exceeded. This is normal for testing.');
    } else if (error.message.includes('insufficient_quota')) {
      console.log('\n💡 Insufficient quota. Please add credits to your OpenAI account.');
    }
  }
}

testAPI();
