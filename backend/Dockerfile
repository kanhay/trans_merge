# Base image
FROM python:3.12.3-bullseye

# Set environment variables
#disables Python from writing .pyc files (compiled bytecode) to disk.
ENV PYTHONDONTWRITEBYTECODE 1
#Forces Python to output logs directly to the terminal without buffering.
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

RUN apt update && apt install -y postgresql

# Install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy project
COPY . /app/

# Run Django commands to set up the project
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
 