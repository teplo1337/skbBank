# skbBank
# Angular Routing: http://skb.kekcheburek.ru/ && /task/:id
# Node Server: http://skb.kekcheburek.ru/api


tasks-page.component   => /task-manager/src/app/main-page <br>
task-page.component    => /task-manager/src/app/task-page <br>
request in task-page for link version <br> <br>

service      => /task-manager/src/app/task.service <br>
node-server  => server.js <br>
mongodb      => 'mongodb:/login:password@ds046377.mlab.com:46377/task-manager';
 <br>

nginx conf:
```
    server {
        listen       80;
        server_name  skb.kekcheburek.ru;
        index index.html;
        root skbBank/task-manager/dist;
        location / {
            try_files $uri /$uri /index.html;          
        }
        location = /api {
           proxy_pass http://localhost:8888/api;
        }
        location ^~ /api/ {
           proxy_pass http://localhost:8888/api/;
        }
    }
```

```
Тестовое задание:

Требования к фронт-энду:

HTML5, CSS3, JS, Angular2


Тестовое задание:

На Angular2 реализовать приложение таск-менеджер (т.е. список задач).
Задача состоит из заголовка, описания и срока

В списке должны отображаться заголовки задач и сроки. При приближении срока ( <= 3 дня) строка с задачей должна менять цвет. При превышении срока строк с задачей должна подсвечиваться красным

Должна быть возможность:
- добавить новую задачу
- отредактировать задачу
- передвинуть задачу по списку
- закрыть задачу
- посмотреть задачу

```
