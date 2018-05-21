# Rails Monolith Sample

Example of an existing simple Rails monolith. This includes an example of a
much more detailed breakdown of a single small feature.

## Filters

filter {#display-filter default="show-all"}

## Stories

chart {#stories-chart}

toggle {#stories-toggle}

- **null**: Unlinked {story="null"}
- **P999**: "Forgot Your Password" {story="p999"}

totals {#stories-total}

## Shirt Store

- Code
  - app
    - controllers
      - `account_controller.rb`
      - `admin_controller.rb`
      - `application.rb`
      - `checkout_controller.rb`
      - `home_controller.rb`
      - `tags_controller.rb`
      - `orders_controller.rb`
      - `sessions_controller.rb`
      - `users_controller.rb`
        - [ ] `forgot_password` action displaying prompt for email {work=1h link=p999}
        - [ ] `reset_password` action that generates email with link {work=1h link=p999}
        - [ ] `change_password` action that lets user store reset password {work=2h link=p999}
    - helpers
    - models
      - `cart.rb`
      - `coupon.rb`
      - `session.rb`
      - `product.rb`
      - `order.rb`
      - `review.rb`
      - `tag.rb`
      - `user.rb`
        - [ ] function to generate a reset password code {work=1.5h link=p999}
      - `user_mailer.rb`
        - [ ] forgot password template including generated URL {work=0.75h link=p999}
    - views
      - layouts
        - `application.rhtml`
        - `admin.rhtml`
      - users
        - [ ] forgot password HTML page for prompting {work=0.75h link=p999}
  - config
    - `routes.rb`
  - db
    - migrate
      - [ ] user table with reset password code and expiration fields {work=1h link=p999}
  - lib
  - public
    - images
    - javascripts
    - stylesheets
  - test
    - factories
    - functional
    - integration
    - unit
      - `order_test.rb`
      - `session_test.rb`
      - `user_test.rb`
        - [ ] test for generating password reset code and expiration data {work=0.5h link=p999}
        - [ ] test for changing user's password {work=0.1h link=p999}

## Administrative

- Administration
  - MR (Merge Request)
    - Submission
      - [ ] **P999** MR Submitted {work=0.25h link=p999}
    - Code reviewed and updated
      - [ ] **P999** MR Approved/Revised {work=0.5h link=p999}
  - QA Tested
    - [ ] **P999** is QA Approved {work=1h link=p999}
  - Deployment
    - [ ] **P999** is Deployed to Production {work=0.5h link=p999}


## Raw Table Data

table {#stories-table}
