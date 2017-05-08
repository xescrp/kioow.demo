{% if ca != ''%}
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px;">
                                <a class="mcnButton " title="{{ca.txt}}" href="{{ca.url}}" target="_blank" style="font-weight: bold; letter-spacing: normal; line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF; background-color: #666666; display:block; padding: 16px; border-collapse: separate !important; border-top-left-radius: 5px;border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px;">{{ca.txt}}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
{% endif %}
