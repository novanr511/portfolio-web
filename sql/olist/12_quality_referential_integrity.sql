-- data quality: orphan foreign keys
SELECT 'items_without_order' AS check_name, COUNT(*) AS bad_rows
FROM order_items i LEFT JOIN orders o ON o.order_id = i.order_id WHERE o.order_id IS NULL
UNION ALL
SELECT 'items_without_seller', COUNT(*)
FROM order_items i LEFT JOIN sellers s ON s.seller_id = i.seller_id WHERE s.seller_id IS NULL
UNION ALL
SELECT 'reviews_without_order', COUNT(*)
FROM order_reviews r LEFT JOIN orders o ON o.order_id = r.order_id WHERE o.order_id IS NULL
UNION ALL
SELECT 'orders_without_customer', COUNT(*)
FROM orders o LEFT JOIN customers c ON c.customer_id = o.customer_id WHERE c.customer_id IS NULL;
