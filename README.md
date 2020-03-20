# README


* System dependencies

* Configuration


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## Ruby and Rails version
- Ruby:2.5.1p57
- Rails:5.0.7.2

## tables
- There are 4 tables.
### users table

|Colummn|type|Options|
|-------|----|-------|
|user_id|integer|nul: false|
|user_name|string|nul: false|
|email|string|unique: true|
|pw|string|nul: false|

#### Association
- has_many :posts
- has_many :groups(group created by the user)
- has_many :groups, through :groups_users

### groups table

|Colummn|type|Options|
|-------|----|-------|
|Group_id|integer|null: false|
|group_name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

#### Association
- has_many :posts
- belongs_to :user(the user created this group)
- has_many :users, through: :groups_users

### groups_users table

|Colummn|type|Options|
|-------|----|-------|
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false,foreign_key: true|

#### Association
- belongs_to :group
- belongs_to :user

### posts table

|Colummn|type|Options|
|-------|----|-------|
|post_id|integer|null: false|
|body|string|null: false|
|image|string||
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false,foreign_key: true|

#### Association
- belongs_to :group_id
- belongs_to :user_id
