{% extends '../dmc-layout.html.swig' %}

{% block body %}

<tr>
    <td align="center" valign="top">
        <!-- BEGIN HEADER // -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader">
            <tr>
                <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        
                            <h1 class="null"><br>
{{ product.title }} was published</h1>

                        </td>
                    </tr>
                </tbody></table>
                
            </td>
        </tr>
    </tbody>
</table></td>
                                        </tr>
                                    </table>
                                    <!-- // END HEADER -->
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <!-- BEGIN BODY // -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody">
                                        <tr>
                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td valign="top" class="mcnTextBlockInner">
                
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" class="mcnTextContentContainer">
                    <tbody><tr>
                        
                        <td valign="top" class="mcnTextContent" style="padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;">
                        
                            <span>Hello {{dmc.name}}, we have published your product.</span><br>
                            <br>
                            <br>
                            Product Title: <strong>{{product.title | title}}</strong>
                            <br>
                            Description (en): <strong>{{product.description_en}}</strong>
                            <br>
                            Days: <strong>{{ product.itinerary.length }}</strong>
                            <br>
                            Destinations: <strong>
                            {% for city in cities %}
                                {{ city }}{% if not loop.last %}, {% endif %}
                            {% endfor %}</strong><br>

                            Tags: <strong>
                            {% for tag in product.tags %}
                                <span>{{ tag.title }}</span>{% if not loop.last %}, {% endif %}
                            {% endfor %}</strong>

                            <br />
                            <br />
                            <br />
 
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
    </tbody>
</table>


<!-- BEGIN Call to action -->
{% set ca = {txt : 'SEE THE PRODUCT', url : 'http://www.openmarket.travel/viaje/'+ product.slug } %}
{% include "../partials/call-to-action.html.swig" %}
<!-- END Call to action -->


{# <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-top-left-radius: 5px;border-top-right-radius: 5px;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;background-color: #309FD3;">
                    <tbody>
                        <tr>
                            <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Arial; font-size: 16px; padding: 16px;">
                                <a class="mcnButton " title="validate your eamil" href="http://www.openmarket.travel/viaje/{{product.slug}}" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">SEE THE PRODUCT</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table> #}

<!-- BEGIN message // -->
{% include "../partials/temessage-trust.html.swig" %}
<!-- // END message -->

</td>
                                        </tr>
                                    </table>
                                    <!-- // END BODY -->
                                </td>
                            </tr>
{% endblock %}                                                       
