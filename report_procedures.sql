SET SERVEROUTPUT ON;
--------------------------------------------------------------------------------
-- Procedure to check if basket items are in stock or not
-- Returns Y if all items are in stock, else returns N
CREATE OR REPLACE PROCEDURE in_stock_or_not
(
    p_basket_num        IN  NUMBER,
    p_items_in_stock    OUT VARCHAR2
)
AS
    CURSOR cur_basket IS 
        SELECT bi.idBasket, bi.quantity, p.stock
        FROM bb_basketitem bi INNER JOIN bb_product p
        USING (idProduct)
        WHERE bi.idBasket = p_basket_num;

    TYPE type_basket IS RECORD (
        basket bb_basketitem.idBasket%TYPE,
        qty bb_basketitem.quantity%TYPE,
        stock bb_product.stock%TYPE
        );
        
    rec_basket type_basket;
    lv_flag_txt CHAR(1) := 'Y';
BEGIN
    FOR rec_basket IN cur_basket
    LOOP
        IF rec_basket.stock < rec_basket.quantity THEN lv_flag_txt := 'N'; END IF;
    END LOOP;
    IF lv_flag_txt = 'Y' THEN p_items_in_stock := 'Y'; END IF;
    IF lv_flag_txt = 'N' THEN p_items_in_stock := 'N'; END IF;
END;

-- Testing
DECLARE
    v_items_in_stock VARCHAR2(1);
BEGIN
    in_stock_or_not(6, v_items_in_stock);
    DBMS_OUTPUT.PUT_LINE('Items in stock: ' || v_items_in_stock);
END;
/

--------------------------------------------------------------------------------
-- Shoppers total spending
-- Returns total of all baskets for a given shopper id
CREATE OR REPLACE FUNCTION tot_purch_sf (
        p_idshopper bb_basket.idbasket%TYPE
    ) 
    RETURN NUMBER IS
        sv_total NUMBER;
BEGIN
    SELECT SUM(TOTAL) INTO sv_total
    FROM bb_basket
    WHERE idshopper = p_idshopper;
    
    RETURN sv_total;
END;

-- Testing
SELECT tot_purch_sf(21) FROM DUAL; -- 66.76

--------------------------------------------------------------------------------
-- Total spending for each shopper (this is just a sql statement)
SELECT s.idshopper, s.firstname, s.lastname, SUM(b.total)
FROM bb_shopper s
JOIN bb_basket b
ON s.idshopper = b.idshopper
GROUP BY s.idshopper, s.firstname, s.lastname;

--------------------------------------------------------------------------------
-- Helpers
SELECT * FROM bb_basket;
SELECT * FROM bb_basket WHERE idshopper=21;
SELECT SUM(total) FROM bb_basket WHERE idshopper=21;

SELECT * FROM bb_product;

DESCRIBE bb_basket;
DESCRIBE bb_shopper;