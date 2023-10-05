<script lang="ts">
    import { copyText } from '$lib/images/util';

    const inputTypes = {
        'store': 'Store',
        'time': 'Time',
        'softserve-chocotwist': 'Soft Serve',
        'food-macaron': 'Macaron',
        'food-cakes': 'Cake',
        'food-praline': 'Praline',
        'beverages-hot-chocolate': 'Hot Chocolate',
        'beverages-cold-chocolate': 'Iced Chocolate',
        'beverages-single-expresso': 'Single Expresso',
        'beverages-affogato': 'Affogato',
        'beverages-hot-black': 'Hot Black/DExpresso/Juice',
        'beverages-cold-black': 'Ice Black',
        'beverages-hot-drink': 'Latte/Cappucino/Mocha',
        'beverages-cold-basic': 'Ice Latte/Cappucino/Mocha',
        'beverages-hot-latte': 'C/V Latte',
        'beverages-cold-latte': 'Ice C/V Latte',
        'beverages-shake': 'Shakes',
        'beverages-tea': 'Tea',
        'beverages-water': 'Aqua-P/San-P',
        'discount-softserve': 'SS Discount',
        'discount-food': 'Food Discount',
        'discount-beverages': 'Drinks Discount',
        'discount-retail': 'Retail Discount',
        'cracked-cones': 'Cracked Cones',
        'total': 'Total',
        'quantity': 'Quantity',
        'retail-mtd': 'Retail MTD',
        'softserve-mtd': 'Soft Serve MTD',
        'food-mtd': 'Food MTD',
        'beverages-mtd': 'Beverages MTD',
        'retail-target': 'Retail Target',
        'softserve-target': 'Soft Serve Target',
        'food-target': 'Food Target',
        'beverages-target': 'Beverages Target',
        'transaction': 'Transaction',
        'crm': 'CRM'
    };

    type DSRProps = {
        store: number;
        time: number;
        softserve: Record<string, number>;
        food: Record<string, number>;
        beverages: Record<string, number>;
        discount: Discount;
        crackedCones: number;
        total: number;
        quantity: number;
        retailMTD?: number;
        softserveMTD: number;
        foodMTD?: number;
        beveragesMTD?: number;
        retailTarget?: number;
        softserveTarget: number;
        foodTarget?: number;
        beveragesTarget?: number;
        transaction: number;
        crm: number;
    };
    type Discount = {
        retail: number;
        softserve: number;
        food: number;
        beverages: number;
    };

    const STORE = [
        'Sky Avenue Kiosk',
        'Sky Avenue Store',
        'Genting Premium Outlets',
    ];

    const TARGET = {
        GPO: {
            MONTHLY: 550000,
            RETAIL: 6800,
            SOFTSERVE: 8500,
            FOOD: 510,
            BEVERAGES: 1190,
        },
        GSA: {
            MONTHLY: 250000,
            RETAIL: 2916.67,
            SOFTSERVE: 4000,
            FOOD: 416.67,
            BEVERAGES: 1000,
        },
        KIOSK: {
            MONTHLY: 120000,
            RETAIL: 1200,
            SOFTSERVE: 2800,
            FOOD: 0,
            BEVERAGES: 0
        },
    };

    const SOFTSERVE: Record<string, number> = {
        CHOCOTWIST: 30.19
    };
    const FOOD: Record<string, number> = {
        MACARON: 18.85,
        CAKES: 21.7,
        PRALINE: 26.4,
    };
    const BEVERAGES: Record<string, number> = {
        SINGLE_EXPRESSO: 7.55,
        AFFOGATO: 28.3,
        // Americano, Double Expresso, Lambda juice
        HOT_BLACK: 11.32,
        // Latte, Cappucino, Mocha
        HOT_DRINK: 13.21,
        // Caramel latte, vanilla latte
        HOT_LATTE: 13.67,
        HOT_CHOCOLATE: 25.47,
        // Americano
        COLD_BLACK: 13.21,
        // Latte, Cappucino, Mocha
        COLD_BASIC: 15.09,
        // Caramel latte, Vanilla latte
        COLD_LATTE: 15.56,
        COLD_CHOCOLATE: 27.36,
        SHAKE: 30.19,
        TEA: 15.09,
        WATER: 11.32,
    };
    const dailySalesReport = ({
        store = 0,
        time = 0,
        softserve,
        food,
        beverages,
        discount,
        crackedCones,
        total,
        quantity,
        retailMTD = 0,
        softserveMTD = 0,
        foodMTD = 0,
        beveragesMTD = 0,
        retailTarget = 0,
        softserveTarget = 0,
        foodTarget = 0,
        beveragesTarget = 0,
        transaction,
        crm,
    }: DSRProps) => {
        const d = new Date();
        const dd = d.getDate();
        const mm = d.getMonth() + 1;
        const yyyy = d.getFullYear();
        const p = (n: number) => `${n}`.padStart(2, '0');
        const date = `${p(dd)}/${p(mm)}/${p(yyyy)}`;

        // Discount
        const {
            retail: rd = 0,
            softserve: ssd = 0,
            food: fd = 0,
            beverages: bd = 0,
        } = discount;
        const totalDiscount = [ssd, fd, bd, rd].reduce((c, v) => c + v);

        // Soft serve
        const ss = softserve
            ? Object.entries(softserve)
                  .map(([flavor, amount]) => SOFTSERVE[flavor] * amount)
                  .reduce((c, v) => c + v) - ssd
            : 0;
        // Food
        const cakes = food
            ? Object.entries(food)
                  .map(([type, amount]) => FOOD[type] * amount)
                  .reduce((c, v) => c + v) - fd
            : 0;
        // Beverages
        const drinks = beverages
            ? Object.entries(beverages)
                  .map(([type, amount]) => BEVERAGES[type] * amount)
                  .reduce((c, v) => c + v) - bd
            : 0;
        // Retail
        const retail = total - ss - cakes - drinks;

        // Month to dates
        const rMTD = retailMTD + retail;
        const ssMTD = softserveMTD + ss;
        const fMTD = foodMTD + cakes;
        const bMTD = beveragesMTD + drinks;
        const mtd = rMTD + ssMTD + fMTD + bMTD;

        // CRM percentage
        const crmP = Math.floor((crm / transaction) * 100);

        // Randomizer for walk in, it needs to be 80% and above transaction
        const [ min, max ] = [1.15, 1.25];
        const ratio = Math.random() * (max - min) + min;
        const walkIn = Math.floor(transaction * ratio);
        const conversion = Math.floor((transaction / walkIn) * 100);

        // Util, helps clean up the numbers
        const rm = (number: number) => `RM ${number.toLocaleString()}`;
        // const rm = value => `RM ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        const cleanup = (str: string) => str.trim().replace(/^ +/gm, '');

        // More decimals = Multiply by moar zeroes
        // const decitwo = n => Math.round(56567.31  / 120000 * 10000) / 100;

        let targetStore: (typeof TARGET)[keyof typeof TARGET];
        if (store === 0) {
            targetStore = TARGET.KIOSK;
        } else if (store === 1) {
            targetStore = TARGET.GSA;
        } else if (store === 2) {
            targetStore = TARGET.GPO;
        } else {
            throw new Error('cock');
        }

        const {
            RETAIL: PLACEHOLDER_RETAIL_TARGET = 0,
            SOFTSERVE: PLACEHOLDER_SOFTSERVE_TARGET = 0,
            FOOD: PLACEHOLDER_FOOD_TARGET = 0,
            BEVERAGES: PLACEHOLDER_BEVERAGES_TARGET = 0,
            MONTHLY: MONTHLY_TARGET = 0,
        } = targetStore;

        // Targets
        const RETAIL_TARGET = retailTarget || PLACEHOLDER_RETAIL_TARGET;
        const SOFTSERVE_TARGET = softserveTarget || PLACEHOLDER_SOFTSERVE_TARGET;
        const FOOD_TARGET = foodTarget || PLACEHOLDER_FOOD_TARGET;
        const BEVERAGES_TARGET = beveragesTarget || PLACEHOLDER_BEVERAGES_TARGET;

        const DAILY_TARGET = [
            SOFTSERVE_TARGET,
            FOOD_TARGET,
            BEVERAGES_TARGET,
            RETAIL_TARGET,
        ].reduce((c, v) => c + v);

        let GODIVA_MALAYSIA = `*${STORE[store]} Sales Report*` + '\n';

        GODIVA_MALAYSIA += `Date: ${date} ${time || 10}:00 PM` + '\n';
        GODIVA_MALAYSIA += '\n';
        GODIVA_MALAYSIA +=
            `Retail: *${rm(retail)} _(${rm(RETAIL_TARGET)})_*` + '\n';
        GODIVA_MALAYSIA +=
            `Soft serve: *${rm(ss)} _(${rm(SOFTSERVE_TARGET)})_*` + '\n';

        if (store) {
            GODIVA_MALAYSIA +=
                `Food: *${rm(cakes)} _(${rm(FOOD_TARGET)})_*` + '\n';
            GODIVA_MALAYSIA +=
                `Beverages: *${rm(drinks)} _(${rm(BEVERAGES_TARGET)})_*` + '\n';
        }

        GODIVA_MALAYSIA += 'Gift Card: *NIL*' + '\n';
        GODIVA_MALAYSIA +=
            `Total: *${rm(total)} _(${rm(DAILY_TARGET)})_*` + '\n';
        GODIVA_MALAYSIA += `Discount: *${rm(totalDiscount)}*` + '\n';
        GODIVA_MALAYSIA += '\n';
        GODIVA_MALAYSIA += `Store target: *${rm(MONTHLY_TARGET)}*` + '\n';
        GODIVA_MALAYSIA += `Retail MTD: *${rm(rMTD)}*` + '\n';
        GODIVA_MALAYSIA += `Softserve MTD: *${rm(ssMTD)}*` + '\n';

        if (store) {
            GODIVA_MALAYSIA += `Food MTD: *${rm(fMTD)}*` + '\n';
            GODIVA_MALAYSIA += `Beverages MTD: *${rm(bMTD)}*` + '\n';
        }

        GODIVA_MALAYSIA += `Total MTD: *${rm(mtd)}*` + '\n';
        GODIVA_MALAYSIA += '\n';
        GODIVA_MALAYSIA += `Actual vs Target: *${
            Math.round((mtd / MONTHLY_TARGET) * 10000) / 100
        }%*`;
        GODIVA_MALAYSIA += '\n';
        GODIVA_MALAYSIA += `Void: *0*` + '\n';
        GODIVA_MALAYSIA += `Reprint receipt: *-*` + '\n';
        GODIVA_MALAYSIA += `Crack cones: *${crackedCones}*` + '\n';
        GODIVA_MALAYSIA += `Manual Receipts: *-*` + '\n';
        GODIVA_MALAYSIA += `Walk in: *${walkIn}*` + '\n';
        GODIVA_MALAYSIA += `Transaction: *${transaction}*` + '\n';
        GODIVA_MALAYSIA += `CRM: *${crm} _(${crmP}%)_*` + '\n';
        GODIVA_MALAYSIA += '\n';

        let GODIVA_GENTING = 'Godiva Sales Report' + '\n';

        GODIVA_GENTING += `${STORE[store]}` + '\n';
        GODIVA_GENTING += `Date: ${date} ${time || 10}:00 PM` + '\n';
        GODIVA_GENTING += '\n';
        GODIVA_GENTING += `Month Target: *${rm(MONTHLY_TARGET)}*` + '\n';
        GODIVA_GENTING += `Day Target: *${rm(DAILY_TARGET)}*` + '\n';
        GODIVA_GENTING += `Day Sales: *${rm(total)}*` + '\n';
        GODIVA_GENTING += `MTD Sales: *${rm(mtd)}*` + '\n';
        GODIVA_GENTING +=
            `Achievement: *${Math.floor((total / DAILY_TARGET) * 100)}%*` +
            '\n';
        GODIVA_GENTING += '\n';
        GODIVA_GENTING += `Traffic: *${walkIn}*` + '\n';
        GODIVA_GENTING += `Transaction: *${transaction}*` + '\n';
        GODIVA_GENTING += `W/in Trans: *${transaction}*` + '\n';
        GODIVA_GENTING += `Conversion: *${conversion}%*` + '\n';
        GODIVA_GENTING +=
            `ATV: *${rm(Math.round((total / transaction) * 100) / 100)}*` + '\n';
        GODIVA_GENTING += `QTY: *${quantity}*` + '\n';
        GODIVA_GENTING += '\n';
        GODIVA_GENTING += 'Cust Demo:' + '\n';
        GODIVA_GENTING += '- Local Chinese, Malay, India' + '\n';
        GODIVA_GENTING += '- Tourist Indonesian, Singaporean, Arabia' + '\n';

        return {
            malaysia: GODIVA_MALAYSIA,
            genting: GODIVA_GENTING,
        };
    };

    let values: Record<string, number> = {};

    for (const inputType in inputTypes) {
        values[inputType] = 0;
    }

    let malaysiaString = 'Godiva Malaysia results go here';
    let gentingString = 'Genting team results go here';

    $: {
        try {
            const results = dailySalesReport({
                store: values['store'],
                time: values['time'],
                softserve: {
                    CHOCOTWIST: values['softserve-chocotwist'],
                },
                food: {
                    MACARON: values['food-macaron'],
                    CAKES: values['food-cakes'],
                    PRALINE: values['food-praline'],
                },
                beverages: {
                    SINGLE_EXPRESSO: values['beverages-single-expresso'],
                    AFFOGATO: values['beverages-affogato'],
                    // Americano, Double Expresso
                    HOT_BLACK: values['beverages-hot-black'],
                    // Latte, Cappucino, Mocha
                    HOT_DRINK: values['beverages-hot-drink'],
                    // Caramel latte, vanilla latte
                    HOT_LATTE: values['beverages-hot-latte'],
                    HOT_CHOCOLATE: values['beverages-hot-chocolate'],
                    // Americano
                    COLD_BLACK: values['beverages-cold-black'],
                    // Latte, Cappucino, Mocha
                    COLD_BASIC: values['beverages-cold-basic'],
                    // Caramel latte, Vanilla latte
                    COLD_LATTE: values['beverages-cold-latte'],
                    COLD_CHOCOLATE: values['beverages-cold-chocolate'],
                    SHAKE: values['beverages-shake'],
                    TEA: values['beverages-tea'],
                    WATER: values['beverages-water'],
                },
                discount: {
                    softserve: values['discount-softserve'],
                    food: values['discount-food'],
                    beverages: values['discount-beverages'],
                    retail: values['discount-retail'],
                },
                crackedCones: values['cracked-cones'],
                total: values['total'],
                quantity: values['quantity'],
                retailMTD: values['retail-mtd'],
                softserveMTD: values['softserve-mtd'],
                beveragesMTD: values['beverages-mtd'],
                foodMTD: values['food-mtd'],
                retailTarget: values['retail-target'],
                softserveTarget: values['softserve-target'],
                beveragesTarget: values['beverages-target'],
                foodTarget: values['food-target'],
                transaction: values['transaction'],
                crm: values['crm'],
            });

            malaysiaString = results.malaysia;
            gentingString = results.genting;
        } catch(e) {}
    }
</script>

<div class="dsr-calculator">
    <div class="inputs">
        {#each Object.entries(inputTypes) as [inputType, inputName]}
            <div class="group">
                <label for="{inputType}-input" class="label"
                    >{inputName}:</label
                >
                <input
                    id="{inputType}-input"
                    type='number'
                    class="input"
                    bind:value={values[inputType]}
                />
            </div>
        {/each}
    </div>

    <div class="outputs">
        Godiva Malaysia:
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <pre id="malaysia-results" on:click={() => copyText(malaysiaString)}>{malaysiaString}</pre>

        <hr />

        Genting Team:
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <pre id="genting-results" on:click={() => copyText(gentingString)}>{gentingString}</pre>
    </div>
</div>

<style>
    @media (min-width: 1280px) {
        .dsr-calculator {
            display: flex;
            justify-content: space-between;
        }
    }

    .dsr-calculator .inputs,
    .dsr-calculator .outputs {
        margin: 30px 40px;
    }

    .dsr-calculator .inputs .group {
        display: flex;
        margin-bottom: 2px;
    }

    .dsr-calculator .inputs .group .label {
        flex: 1 0;
        text-align: right;
        padding-right: 8px;
    }

    .dsr-calculator .inputs .group .input {
        display: flex;
        /* flex: 1 0; */
        color: #fff;
        background: rgba(255,255,255,.1);
        border: none;
        padding: 0 6px;
        height: 24px;
        max-width: 30%;
    }
</style>
