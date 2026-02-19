    <style>
        :root {
            --gold: #D4AF37;       /* ذهبي ملكي */
            --orange: #FF8C00;     /* برتقالي رياضي */
            --light-blue: #87CEEB;  /* أزرق فاتح */
            --dark-bg: #1a1a1a;    /* خلفية داكنة للعناوين */
        }

        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f7; margin: 0; color: #333; }
        
        header { 
            background: var(--dark-bg); 
            color: var(--gold); 
            text-align: center; 
            padding: 25px 0; 
            border-bottom: 4px solid var(--orange);
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .site-name { 
            font-size: 35px; 
            font-weight: bold; 
            margin: 0; 
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        /* شريط التنقل بالأزرق الفاتح والذهبي */
        .date-navigator { 
            background: var(--light-blue); 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            padding: 12px; 
            border-bottom: 2px solid var(--gold);
            gap: 15px;
        }

        .nav-btn { 
            background: var(--dark-bg); 
            color: var(--gold); 
            border: 1px solid var(--gold); 
            padding: 8px 18px; 
            cursor: pointer; 
            border-radius: 20px; 
            font-weight: bold;
            transition: 0.3s;
        }

        .nav-btn:hover {
            background: var(--orange);
            color: white;
        }

        #current-date-display { font-weight: bold; color: #003366; font-size: 18px; }

        .container { max-width: 900px; margin: 20px auto; padding: 0 10px; }

        .section-header { 
            background: var(--orange); 
            color: white; 
            padding: 8px 20px; 
            display: inline-block; 
            border-radius: 25px; 
            margin-bottom: 15px;
            font-weight: bold;
        }

        /* بطاقة المباراة بتنسيق الألوان الجديد */
        .match-card { 
            background: #fff; 
            border-radius: 15px; 
            overflow: hidden; 
            box-shadow: 0 5px 15px rgba(0,0,0,0.1); 
            margin-bottom: 30px; 
            border-top: 5px solid var(--gold);
        }

        .match-header { background: #fffcf0; text-align: center; padding: 10px; color: var(--orange); font-weight: bold; }
        
        .match-body { display: flex; justify-content: space-around; align-items: center; padding: 30px 10px; }
        
        .team-name { font-size: 20px; font-weight: bold; color: #1a1a1a; }
        
        .match-meta { border-right: 2px solid var(--light-blue); border-left: 2px solid var(--light-blue); padding: 0 20px; }
        
        .match-time { font-size: 28px; font-weight: bold; color: var(--dark-bg); }
        
        .timer-box { color: var(--orange); font-size: 15px; margin-top: 5px; font-weight: bold; }

        /* الجدول */
        .teams-table { 
            width: 100%; 
            border-collapse: collapse; 
            background: white; 
            border-radius: 10px; 
            overflow: hidden; 
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }

        .teams-table th { background: var(--light-blue); color: #003366; padding: 15px; }
        
        .teams-table td { border-bottom: 1px solid #eee; padding: 12px; transition: 0.2s; }
        
        .teams-table tr:hover { background: #fffcf0; }

        .live-badge { 
            background: linear-gradient(to right, #ff4b2b, #ff416c); 
            color: white; 
            padding: 3px 10px; 
            border-radius: 10px; 
        }
    </style>
