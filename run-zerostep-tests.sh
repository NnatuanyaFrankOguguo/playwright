#!/bin/bash

# Zerostep Playwright Tests Quick Start
# No Docker required!

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=== Zerostep Playwright Tests ===${NC}\n"

# Check if API key is set
if [ -z "$ZEROSTEP_API_KEY" ]; then
    echo -e "${YELLOW}⚠ ZEROSTEP_API_KEY not set${NC}"
    echo ""
    echo "You need a Zerostep API key. Here's how to get one:"
    echo "1. Go to https://zerostep.ai/"
    echo "2. Sign up (free)"
    echo "3. Get your API key from the dashboard"
    echo "4. Set it: export ZEROSTEP_API_KEY=your_key_here"
    echo ""
    echo "Or add it to your .env file:"
    echo "ZEROSTEP_API_KEY=your_key_here"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ ZEROSTEP_API_KEY is set${NC}\n"

# Check dependencies
echo -e "${BLUE}Checking dependencies...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js ${NC}$(node --version)"

if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm ${NC}$(npm --version)\n"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed\n${NC}"
fi

# Run tests
echo -e "${BLUE}Running Zerostep Playwright tests...${NC}\n"
npx playwright test tests/mygatheringhelpsupportticket.zerostep.spec.ts "$@"

# Show results
EXIT_CODE=$?
echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ Tests passed!${NC}"
else
    echo -e "${RED}❌ Tests failed${NC}"
fi

echo ""
echo -e "${BLUE}To run tests again:${NC}"
echo -e "  ${YELLOW}npm test${NC} - Run all tests"
echo -e "  ${YELLOW}npx playwright test tests/mygatheringhelpsupportticket.zerostep.spec.ts${NC} - Run Zerostep tests"
echo -e "  ${YELLOW}npx playwright test --headed${NC} - Run with browser visible"
echo -e "  ${YELLOW}npx playwright test --debug${NC} - Run in debug mode"

exit $EXIT_CODE
