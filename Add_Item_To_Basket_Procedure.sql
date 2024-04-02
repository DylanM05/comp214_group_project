-- Procedure adds a new item to the basket


CREATE OR REPLACE PROCEDURE basket_add_sp (
    p_idBasketItem IN NUMBER,   -- id will be auto-generated
    p_idProduct IN NUMBER,
    p_idBasket IN NUMBER,
    p_price IN NUMBER,
    p_quantity IN NUMBER,
    p_sizeCode IN NUMBER,
    p_formCode IN NUMBER )
IS
BEGIN
-- insert new item into bb_basketitem table
    INSERT INTO bb_basketItem (idBasketItem, idProduct, idBasket, price, quantity, option1, option2)
    VALUES (BB_IDBASKETITEM_SEQ.NEXTVAL, p_idProduct, p_idBasket, p_price, p_quantity, p_sizeCode, p_formCode);
    --commit
    COMMIT;
    
    -- When item is added successfully print a message stating so.
    DBMS_OUTPUT.PUT_LINE('Item added to the basket.');
EXCEPTION -- print error message if not added successfully.
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('There was an error adding the item to the basket. Please try again'); -- error message
END;
/

--Testing procedure by adding values below
DECLARE
    v_idBasket NUMBER := 14;
    v_idProduct NUMBER := 8;
    v_price NUMBER := 10.80;
    v_quantity NUMBER := 1;
    v_sizeCode NUMBER := 2;
    v_formCode NUMBER := 4;
BEGIN
    basket_add_sp(  --call basket_add_sp procedure to add items
        p_idBasketItem => NULL,  -- Since this is auto-generated, we don't need to provide it
        p_idProduct => v_id_product,
        p_idBasket => v_idBasket,
        p_price => v_price,
        p_quantity => v_quantity,
        p_sizeCode => v_sizeCode,
        p_formCode => v_formCode
    );
END;
/

--run the select statement to check the items were successfully added to the bb_basketitem table.
SELECT * FROM bb_basketItem;
