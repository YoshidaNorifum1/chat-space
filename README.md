# README


* System dependencies

* Configuration


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

* Ruby and Rails version
  Ruby:2.5.1p57
  Rails:5.0.7.2

* Database creation

## users table

|Colummn|type|Options|
|user_id|integer|nul: false|
|user_name|string|nul: false|
|email|string||
|pw|string|nul: false|

### Association
- has_many :posts
- has_many :groups, through: :groups_users