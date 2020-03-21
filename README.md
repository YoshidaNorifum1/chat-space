# README

## Ruby and Rails version
- Ruby:2.5.1p57
- Rails:5.0.7.2

## tables
- There are 4 tables.
### users table

|Colummn|type|Options|
|-------|----|-------|
|name|string|nul: false, index: true|
|email|string|unique: true|
|pw|string|nul: false|

#### Association
- has_many :posts
- has_many :groups_users
- has_many :groups, through: :groups_users

### groups table

|Colummn|type|Options|
|-------|----|-------|
|name|string|null: false|

#### Association
- has_many :posts
- belongs_to :groups_users
- has_many :users, through: :groups_users

### groups_users table

|Colummn|type|Options|
|-------|----|-------|
|group|references|null: false,foreign_key: true|
|user|references|null: false,foreign_key: true|

#### Association
- belongs_to :group
- belongs_to :user

### posts table

|Colummn|type|Options|
|-------|----|-------|
|body|string||
|image|string||
|group|references|null: false,foreign_key: true|
|user|references|null: false,foreign_key: true|

#### Association
- belongs_to :group
- belongs_to :user
