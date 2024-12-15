COMPOSE_FILE = docker-compose.yml
BACKEND_SERVICE = web


up:
	@docker-compose -f $(COMPOSE_FILE) up  --build -d

down:
	@docker-compose -f $(COMPOSE_FILE) down

logs:
	@docker-compose -f $(COMPOSE_FILE) logs -f

restart:
	@docker-compose -f $(COMPOSE_FILE) down
	@docker-compose -f $(COMPOSE_FILE) up -d --build

ps:
	@docker-compose -f $(COMPOSE_FILE) ps

makemigrations:
	@docker-compose -f $(COMPOSE_FILE) exec $(BACKEND_SERVICE) python manage.py makemigrations $(APPNAME)

migrate:
	@docker-compose -f $(COMPOSE_FILE) exec $(BACKEND_SERVICE) python manage.py migrate

clean:
	@docker-compose -f $(COMPOSE_FILE) down --volumes --remove-orphans
	@docker system prune -f --volumes

createsuperuser:
	@docker-compose exec -it web python manage.py createsuperuser

frontend:
	@docker-compose -f $(COMPOSE_FILE) up -d --build frontend

backend:
	@docker-compose -f $(COMPOSE_FILE) up -d --build web

db:
	@docker-compose -f $(COMPOSE_FILE) up -d --build db

shell:
	@docker-compose exec -it $(BACKEND_SERVICE) python manage.py shell
