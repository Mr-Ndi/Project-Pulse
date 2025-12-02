FROM python:3.12-slim
WORKDIR /Fasting
COPY . .
# using psycopg2-binary so no libpq-dev/build-essential required
RUN apt-get update && apt-get install -y \
    iputils-ping \
    curl \        
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache -r requirements.txt

EXPOSE 3500
CMD ["python3", "index.py"]