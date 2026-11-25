-- data quality: duplicate primary keys or item lines?
SELECT 'orders' AS check_name, COUNT(*) - COUNT(DISTINCT order_id) AS duplicates FROM orders
UNION ALL
SELECT 'customers', COUNT(*) - COUNT(DISTINCT customer_id) FROM customers
UNION ALL
SELECT 'order_items', COUNT(*) - COUNT(DISTINCT order_id || '-' || order_item_id) FROM order_items
UNION ALL
SELECT 'reviews', COUNT(*) - COUNT(DISTINCT review_id) FROM order_reviews;
