FROM python:3.12-slim

WORKDIR /app

# Install Node.js 20
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       curl \
       ca-certificates \
       nodejs \
       npm \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt

# Install Node dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

EXPOSE 5000

CMD ["npm", "start"]