# Easy Setup AI - Documentation

## Overview
Easy Setup AI is a solution that automates the creation and configuration of VTEX stores for B2C operations, using artificial intelligence (GPT-4) to generate structured data and configure all necessary resources.

## Main Features

### 1. AI Data Generation
- Uses GPT-4 to generate structured data
- Customization based on:
  - Industry
  - Number of departments
  - Category levels
  - Number of products
  - Number of SKUs
  - Multiple SKUs support
  - Language
  - Additional instructions

### 2. VTEX Resources Configuration

#### Catalog
- Brand creation
- Category configuration
- Product registration
- SKU generation
- Image upload

#### Pricing
- Base price configuration
- Price tables
- Price rules
- Discounts

#### Logistics
- Dock configuration
- Warehouse management
- Stock control
- Shipping configuration

#### Payments
- Payment methods
- Installment configuration
- Gateway integration
- Anti-fraud rules

#### Benefits
- Loyalty programs
- Progressive discounts
- Benefit rules
- Marketing tags

### 3. Architecture

#### VTEX Clients
- `CatalogClient`: Catalog management
- `PricingClient`: Price configuration
- `LogisticsClient`: Logistics management
- `BenefitClient`: Benefits configuration
- `GatewayClient`: Payment integration
- `CheckoutClient`: Checkout configuration
- `OpenAIClient`: GPT-4 integration
- `VBaseClient`: Data storage

#### Execution Flow
1. Configuration parameters reception
2. AI data generation
3. VBase storage
4. VTEX resource creation
5. Configuration validation

## Requirements

### VTEX Permissions
- Catalog access
- Price configuration
- Stock management
- Payment configuration
- OpenAI API access

### Dependencies
- Node.js 12.x
- VTEX IO CLI
- VTEX Account
- OpenAI API Key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/easy-setup-ai.git
```

2. Install dependencies:
```bash
yarn install
```

3. Configure environment variables:
```bash
OPENAI_API_KEY=your-api-key
```

4. Link the app:
```bash
vtex link
```

## Usage

1. Access the app in VTEX admin
2. Configure desired parameters:
   - Industry
   - Departments
   - Categories
   - Products
   - SKUs
   - Language
   - Additional instructions

3. Execute configuration
4. Wait for process completion
5. Verify generated configurations

## Data Structure

### Generated Data Example
```json
{
  "categories": [...],
  "products": [...],
  "brands": [...],
  "pricing": [...],
  "logistics": [...]
}
```

## Support

For support, please:
1. Open a GitHub issue
2. Describe the problem in detail
3. Include error logs when applicable
4. Provide used parameters

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Warning

**HEADS UP!** WE STRONGLY ADVISE THAT YOU DO NOT RUN EASY SETUP ON A PRODUCTION ENVIRONMENT. IT WILL MAKE IRREVERSIBLE CHANGES AND MAY BREAK YOUR STORE.

## Sample Data

### Users
```
Email: john@email.com
PriceTable: platinum

Email: steven@email.com
PriceTable: gold

Email: chris@email.com
PriceTable: silver
```

### Brands
```
Name: Brand (9280)
```

### Collection
```
Name: All
Type: Inclusive
BrandId: 9280 (Brand)
```

### Categories
```
Name: Apparel             (9281)
Name: Food and beverage   (9282)
Name: Sporting            (9283)
Name: Agribusiness        (9284)
Name: Home Appliance      (9285)
Name: Computer & Software (9286)
Name: Power tools         (9287)
```

### Fields
```
Group: Specifications

Category: Apparel (9281)
Field: Clothes Size
Field Values: S, M, L and XL

Category: Sporting (9283)
Field: Shoes Size
Field Values: 8, 8.5, 9, 9.5 and 10
```

### Logistics
```
Freight Values:
    Country: BRA
    ZipCodeStart: 0
    ZipCodeEnd: 9999999

    Country: USA
    ZipCodeStart: 0
    ZipCodeEnd: 99999999

Docks:
    Name: Main Dock (1)
    Country: BRA

    Name: Main Dock (2)
    Country: USA

Warehouse:
    Name: Stock (1_1)
    Docks:
        Main Dock (1)
        Main Dock (2)
```

### Pricing
```
Price Tables:
Name: silver
Percentual Modifier: -5%

Name: gold
Percentual Modifier: -10%

Name: platinum
Percentual Modifier: -15%
```

### Benefits
```
Name: Progressive Discount
Conditions:
Start: 2010-01-01
End: 2070-01-01
Collection: All
Benefit:
  Quantity: 5
  Discount: 5%

  Quantity: 10
  Discount: 15%

  Quantity: 15
  Discount: 25%

  Quantity: 20
  Discount: 35%
```

### Taxes
```
Name: VAT
Condition:
Start: 2010-01-01
End: 2070-01-01
Category: Agribusiness (9284)
Tax: 5%

Name: ICMS
Condition:
Start: 2010-01-01
End: 2070-01-01
Category: Agribusiness (9284)
Tax: 12%
```

### Payment
```
Affiliation: Promissory
Custom Payment: Promissory (201)
Payment Condition: Promissory

Affiliation: Test
Payment Condition: VISA (credit card)

Affiliation: CreditControlV2
Payment Conditions:
15 days (0% interest)
30 days (0% interest)
15 and 30 days (1% interest)
15, 30 and 45 days (1.5% interest)
```
