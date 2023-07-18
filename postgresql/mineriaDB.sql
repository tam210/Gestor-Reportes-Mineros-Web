PGDMP     )    +                {         	   mineriaDB    15.3    15.3 9    h           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            i           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            j           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            k           1262    30479 	   mineriaDB    DATABASE     ~   CREATE DATABASE "mineriaDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "mineriaDB";
                postgres    false                        3079    30872 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            l           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    30758    camion    TABLE     n   CREATE TABLE public.camion (
    idcamion integer NOT NULL,
    idflota integer NOT NULL,
    patente text
);
    DROP TABLE public.camion;
       public         heap    postgres    false            �            1259    30813    carguio    TABLE     Q   CREATE TABLE public.carguio (
    idcarguio integer NOT NULL,
    nombre text
);
    DROP TABLE public.carguio;
       public         heap    postgres    false            �            1259    30777    destino    TABLE     n   CREATE TABLE public.destino (
    iddestino integer NOT NULL,
    idrajo integer NOT NULL,
    nombre text
);
    DROP TABLE public.destino;
       public         heap    postgres    false            �            1259    30820    fecha    TABLE     L   CREATE TABLE public.fecha (
    idfecha integer NOT NULL,
    fecha date
);
    DROP TABLE public.fecha;
       public         heap    postgres    false            �            1259    30751    flota    TABLE     M   CREATE TABLE public.flota (
    idflota integer NOT NULL,
    nombre text
);
    DROP TABLE public.flota;
       public         heap    postgres    false            �            1259    30857    kpi    TABLE     �   CREATE TABLE public.kpi (
    idkpi integer NOT NULL,
    idzona integer NOT NULL,
    idfecha integer NOT NULL,
    esperado double precision
);
    DROP TABLE public.kpi;
       public         heap    postgres    false            �            1259    30801    origen    TABLE     l   CREATE TABLE public.origen (
    idorigen integer NOT NULL,
    idzona integer NOT NULL,
    nombre text
);
    DROP TABLE public.origen;
       public         heap    postgres    false            �            1259    30770    rajo    TABLE     K   CREATE TABLE public.rajo (
    idrajo integer NOT NULL,
    nombre text
);
    DROP TABLE public.rajo;
       public         heap    postgres    false            �            1259    30825    viaje    TABLE     A  CREATE TABLE public.viaje (
    idviaje integer NOT NULL,
    idcarguio integer NOT NULL,
    idfecha integer NOT NULL,
    idcamion integer NOT NULL,
    idorigen integer NOT NULL,
    iddestino integer NOT NULL,
    ciclos integer,
    tonelaje double precision,
    tonelajereal double precision,
    material text
);
    DROP TABLE public.viaje;
       public         heap    postgres    false            �            1259    30789    zona    TABLE     h   CREATE TABLE public.zona (
    idzona integer NOT NULL,
    idrajo integer NOT NULL,
    nombre text
);
    DROP TABLE public.zona;
       public         heap    postgres    false            �            1259    30905 
   prekpirajo    VIEW     �  CREATE VIEW public.prekpirajo AS
 SELECT protokpirajo.rajonombre,
    protokpirajo.fecha,
    protokpirajo.idfecha,
    sum(protokpirajo."real") AS rajoreal,
    sum(protokpirajo.esperado) AS esperadokpi
   FROM ( SELECT viaje.idfecha,
            fecha.fecha,
            zona.idrajo,
            rajo.nombre AS rajonombre,
            zona.nombre AS zonanombre,
            sum(viaje.tonelajereal) AS "real",
            kpi.esperado
           FROM (((((public.viaje
             JOIN public.origen ON ((viaje.idorigen = origen.idorigen)))
             JOIN public.zona ON ((origen.idzona = zona.idzona)))
             JOIN public.rajo ON ((zona.idrajo = rajo.idrajo)))
             JOIN public.kpi ON (((viaje.idfecha = kpi.idfecha) AND (zona.idzona = kpi.idzona))))
             JOIN public.fecha ON ((viaje.idfecha = fecha.idfecha)))
          GROUP BY viaje.idfecha, fecha.fecha, zona.idrajo, rajo.nombre, kpi.esperado, zona.nombre
          ORDER BY zona.idrajo, viaje.idfecha) protokpirajo
  GROUP BY protokpirajo.rajonombre, protokpirajo.fecha, protokpirajo.idfecha, protokpirajo.idrajo
  ORDER BY protokpirajo.rajonombre, protokpirajo.fecha;
    DROP VIEW public.prekpirajo;
       public          postgres    false    224    223    223    222    222    220    220    219    219    219    217    217    223    224    224            �            1259    30910 
   prekpizona    VIEW     �  CREATE VIEW public.prekpizona AS
 SELECT fecha.fecha,
    viaje.idfecha,
    zona.idrajo,
    rajo.nombre AS rajonombre,
    kpi.idzona,
    zona.nombre AS zonanombre,
    sum(viaje.tonelajereal) AS "real",
    kpi.esperado
   FROM (((((public.viaje
     JOIN public.origen ON ((viaje.idorigen = origen.idorigen)))
     JOIN public.zona ON ((origen.idzona = zona.idzona)))
     JOIN public.rajo ON ((zona.idrajo = rajo.idrajo)))
     JOIN public.kpi ON (((viaje.idfecha = kpi.idfecha) AND (zona.idzona = kpi.idzona))))
     JOIN public.fecha ON ((viaje.idfecha = fecha.idfecha)))
  GROUP BY viaje.idfecha, fecha.fecha, zona.idrajo, rajo.nombre, kpi.idzona, zona.nombre, kpi.esperado
  ORDER BY zona.idrajo, kpi.idzona, viaje.idfecha;
    DROP VIEW public.prekpizona;
       public          postgres    false    223    220    222    220    224    224    219    219    222    223    217    219    217    223    224            �            1259    30893 	   solicitud    TABLE     n   CREATE TABLE public.solicitud (
    idsolicitud integer NOT NULL,
    correo text NOT NULL,
    fecha date
);
    DROP TABLE public.solicitud;
       public         heap    postgres    false            �            1259    30883    usuario    TABLE       CREATE TABLE public.usuario (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    correo character varying(255),
    nombre character varying(255),
    apellido character varying(255),
    pass character varying(255),
    tipousuario integer,
    estado integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false    2            [          0    30758    camion 
   TABLE DATA           <   COPY public.camion (idcamion, idflota, patente) FROM stdin;
    public          postgres    false    216   F       `          0    30813    carguio 
   TABLE DATA           4   COPY public.carguio (idcarguio, nombre) FROM stdin;
    public          postgres    false    221   mG       ]          0    30777    destino 
   TABLE DATA           <   COPY public.destino (iddestino, idrajo, nombre) FROM stdin;
    public          postgres    false    218   �G       a          0    30820    fecha 
   TABLE DATA           /   COPY public.fecha (idfecha, fecha) FROM stdin;
    public          postgres    false    222   �H       Z          0    30751    flota 
   TABLE DATA           0   COPY public.flota (idflota, nombre) FROM stdin;
    public          postgres    false    215   I       c          0    30857    kpi 
   TABLE DATA           ?   COPY public.kpi (idkpi, idzona, idfecha, esperado) FROM stdin;
    public          postgres    false    224   �I       _          0    30801    origen 
   TABLE DATA           :   COPY public.origen (idorigen, idzona, nombre) FROM stdin;
    public          postgres    false    220   �J       \          0    30770    rajo 
   TABLE DATA           .   COPY public.rajo (idrajo, nombre) FROM stdin;
    public          postgres    false    217   �L       e          0    30893 	   solicitud 
   TABLE DATA           ?   COPY public.solicitud (idsolicitud, correo, fecha) FROM stdin;
    public          postgres    false    226   �L       d          0    30883    usuario 
   TABLE DATA           Z   COPY public.usuario (id, correo, nombre, apellido, pass, tipousuario, estado) FROM stdin;
    public          postgres    false    225   �L       b          0    30825    viaje 
   TABLE DATA           �   COPY public.viaje (idviaje, idcarguio, idfecha, idcamion, idorigen, iddestino, ciclos, tonelaje, tonelajereal, material) FROM stdin;
    public          postgres    false    223   M       ^          0    30789    zona 
   TABLE DATA           6   COPY public.zona (idzona, idrajo, nombre) FROM stdin;
    public          postgres    false    219   +�       �           2606    30764    camion camion_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.camion
    ADD CONSTRAINT camion_pkey PRIMARY KEY (idcamion);
 <   ALTER TABLE ONLY public.camion DROP CONSTRAINT camion_pkey;
       public            postgres    false    216            �           2606    30819    carguio carguio_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.carguio
    ADD CONSTRAINT carguio_pkey PRIMARY KEY (idcarguio);
 >   ALTER TABLE ONLY public.carguio DROP CONSTRAINT carguio_pkey;
       public            postgres    false    221            �           2606    30783    destino destino_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.destino
    ADD CONSTRAINT destino_pkey PRIMARY KEY (iddestino);
 >   ALTER TABLE ONLY public.destino DROP CONSTRAINT destino_pkey;
       public            postgres    false    218            �           2606    30824    fecha fecha_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.fecha
    ADD CONSTRAINT fecha_pkey PRIMARY KEY (idfecha);
 :   ALTER TABLE ONLY public.fecha DROP CONSTRAINT fecha_pkey;
       public            postgres    false    222            �           2606    30757    flota flota_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.flota
    ADD CONSTRAINT flota_pkey PRIMARY KEY (idflota);
 :   ALTER TABLE ONLY public.flota DROP CONSTRAINT flota_pkey;
       public            postgres    false    215            �           2606    30861    kpi kpi_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.kpi
    ADD CONSTRAINT kpi_pkey PRIMARY KEY (idkpi);
 6   ALTER TABLE ONLY public.kpi DROP CONSTRAINT kpi_pkey;
       public            postgres    false    224            �           2606    30807    origen origen_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.origen
    ADD CONSTRAINT origen_pkey PRIMARY KEY (idorigen);
 <   ALTER TABLE ONLY public.origen DROP CONSTRAINT origen_pkey;
       public            postgres    false    220            �           2606    30776    rajo rajo_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rajo
    ADD CONSTRAINT rajo_pkey PRIMARY KEY (idrajo);
 8   ALTER TABLE ONLY public.rajo DROP CONSTRAINT rajo_pkey;
       public            postgres    false    217            �           2606    30899    solicitud solicitud_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT solicitud_pkey PRIMARY KEY (idsolicitud);
 B   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT solicitud_pkey;
       public            postgres    false    226            �           2606    30892    usuario usuario_correo_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correo_key UNIQUE (correo);
 D   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_correo_key;
       public            postgres    false    225            �           2606    30890    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    225            �           2606    30831    viaje viaje_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_pkey PRIMARY KEY (idviaje);
 :   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_pkey;
       public            postgres    false    223            �           2606    30795    zona zona_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.zona
    ADD CONSTRAINT zona_pkey PRIMARY KEY (idzona);
 8   ALTER TABLE ONLY public.zona DROP CONSTRAINT zona_pkey;
       public            postgres    false    219            �           2606    30765    camion camion_idflota_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.camion
    ADD CONSTRAINT camion_idflota_fkey FOREIGN KEY (idflota) REFERENCES public.flota(idflota);
 D   ALTER TABLE ONLY public.camion DROP CONSTRAINT camion_idflota_fkey;
       public          postgres    false    216    3237    215            �           2606    30784    destino destino_idrajo_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.destino
    ADD CONSTRAINT destino_idrajo_fkey FOREIGN KEY (idrajo) REFERENCES public.rajo(idrajo);
 E   ALTER TABLE ONLY public.destino DROP CONSTRAINT destino_idrajo_fkey;
       public          postgres    false    217    3241    218            �           2606    30867    kpi kpi_idfecha_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.kpi
    ADD CONSTRAINT kpi_idfecha_fkey FOREIGN KEY (idfecha) REFERENCES public.fecha(idfecha);
 >   ALTER TABLE ONLY public.kpi DROP CONSTRAINT kpi_idfecha_fkey;
       public          postgres    false    224    222    3251            �           2606    30862    kpi kpi_idzona_fkey    FK CONSTRAINT     t   ALTER TABLE ONLY public.kpi
    ADD CONSTRAINT kpi_idzona_fkey FOREIGN KEY (idzona) REFERENCES public.zona(idzona);
 =   ALTER TABLE ONLY public.kpi DROP CONSTRAINT kpi_idzona_fkey;
       public          postgres    false    219    224    3245            �           2606    30808    origen origen_idzona_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.origen
    ADD CONSTRAINT origen_idzona_fkey FOREIGN KEY (idzona) REFERENCES public.zona(idzona);
 C   ALTER TABLE ONLY public.origen DROP CONSTRAINT origen_idzona_fkey;
       public          postgres    false    220    3245    219            �           2606    30900    solicitud solicitud_correo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT solicitud_correo_fkey FOREIGN KEY (correo) REFERENCES public.usuario(correo);
 I   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT solicitud_correo_fkey;
       public          postgres    false    226    225    3257            �           2606    30842    viaje viaje_idcamion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idcamion_fkey FOREIGN KEY (idcamion) REFERENCES public.camion(idcamion);
 C   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idcamion_fkey;
       public          postgres    false    3239    216    223            �           2606    30832    viaje viaje_idcarguio_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idcarguio_fkey FOREIGN KEY (idcarguio) REFERENCES public.carguio(idcarguio);
 D   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idcarguio_fkey;
       public          postgres    false    223    3249    221            �           2606    30852    viaje viaje_iddestino_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_iddestino_fkey FOREIGN KEY (iddestino) REFERENCES public.destino(iddestino);
 D   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_iddestino_fkey;
       public          postgres    false    3243    218    223            �           2606    30837    viaje viaje_idfecha_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idfecha_fkey FOREIGN KEY (idfecha) REFERENCES public.fecha(idfecha);
 B   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idfecha_fkey;
       public          postgres    false    222    3251    223            �           2606    30847    viaje viaje_idorigen_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.viaje
    ADD CONSTRAINT viaje_idorigen_fkey FOREIGN KEY (idorigen) REFERENCES public.origen(idorigen);
 C   ALTER TABLE ONLY public.viaje DROP CONSTRAINT viaje_idorigen_fkey;
       public          postgres    false    220    3247    223            �           2606    30796    zona zona_idrajo_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY public.zona
    ADD CONSTRAINT zona_idrajo_fkey FOREIGN KEY (idrajo) REFERENCES public.rajo(idrajo);
 ?   ALTER TABLE ONLY public.zona DROP CONSTRAINT zona_idrajo_fkey;
       public          postgres    false    217    3241    219            [   ?  x�-�;n�@и�0��μ�$��ϱT��Fb�D�,Y/9Ч��X�jVG��5��>�p�C�.뺡Bt�jL�N(4�&�"��Aѷ��c�o����L�19��p�#`L��19:�ɱ᲼q�� nD��	��$
^D�o���9�A	BV<s�A��6J��"F��+�FݻG�8�Eʨ���@�(�>*d�.2�~��Q��Fːg�)3�����u�|~����(��(������8�N�\��]5��gG6��su�^�-��]�u���������)�,��O�a�Ij�'u��� ���s�      `   g   x��1�@D�:�0�c;�DD)�����̳,yl����3�/�X�L�2�ɱ�q�4f#d����2P����^hu��:/�eߏ����*�w�?�6      ]   �   x�e�Mn� �׼S���$�c���,eQ��ߢ��6��f�����V3�f�I��*��[�a��'c�K�q���ρ3FE�}��������#3���.>s3�.BJe��ʼ5_
�/��Lʨ�75<��0�j|�����$	�����6u��ݤ^~T�yy����3�,I�|�^�[��]�A��{�}kKH�[�웭v�-������}�|AS�      a   (   x�3�4202�50�50�2Dp���c.cǄ+F��� �	a      Z   m   x�=�A@0E����'�RT��A�ZX����Aw��y3�U]��βB�e�I��O#��������<�
Ͳ��_�&�UC'U+��$O�",N���'��;�<�G . ��      c   ,  x�U�[n�0�oX2���K����[�4�"'61'7�Μ�%�ZG��tf�J,;� l��|�R)��[�A13�/X��|�E5��
|��\����tZ�zJYz�X_�1��"#.�"t�֧H9��b��J�}�	��R����<��Dk$�'�;��u/E�(X��u��eL�M����,��w�ڄފ�nV*ȩ�����r�bg6$|lؔ���p��;��	_8[���J&k�J�m%oeۿ��GF�H{j7�����;u��V�}5@�gbBڍ7I���֣����h�_�H�B:�V�#����`1      _   �  x�m�Mn�0���]&�${��Pt�)�YdQ���E�x�*��G��Iq�l��;����� ��&yB�:�,lB�3yҴ}ܾ�ܷ��l�d_d]��{�D�Hej�A7�5Ē�a�)@\����e	Ǻ�D����I4&k$��I�Ay&�����tҀkĐ���y����s��N}H9P-��f9�(�Z�'�B���ٲ�~��wҚZ�^_�(����@
���H�!Gs�N�~�4��Ѐ9�4���}���J��qy�<�=�hf�w�Vw/JVzR�jl5����=�FS<�b�q��K잓�bl$�q�#���n����f�Fx���ýx!���_>�]&��8��_�����4E���R�H���MX�����cN�:�����6��y�1e8y���9B��U�*��I�W>�"���	~      \   <   x�3�tpr�r�2D��C���8C\������9}|���L8]��C]�B�b1z\\\ ��      e      x������ � �      d      x������ � �      b      x���K�u�m�ǧ~Eӓݨ˰�x�
nT2H=)�N�'H���II�l-�F��s(��������O���_�毟�Ͽ��O?���������� ������-*��������]X����+�[Q��J�wLm���e+�ʻ�>m����o��*��+_�o�N�y�*�̍c�f�>���#���X�
Je�-�ϓ2��Yq�}�U1�R��G`���V���-A�$X���K������[�Cy�޲0C�PC�=�]�(�;{�FV#@u��"؋�!{27�Lv7ёbȞ�dw�(��w罪��Ȑm�$�hF=��C�D0���'�SU�3:}*��b�7�mņ�?�5��߰e�dX��-T��O�Wٓa�_����h�B���{������J�$X?��;�ŢH��hR�E�A�"]	�?����)~t��SKxa��K��z��1�3)O���p
��7Eh����픶0�)�)�-�}qCn�Q�¬bE�<�Ϧ�ò�����ݫ揶Ѣ�.)Y1�VѢ�(Z����j��U7)���ʬ�
��ƅ�M,)��e1����űX�}��X

�s,E�ֶ��UF���߰��7��x�|(����Nn�E�[ےb�XѢ�Z���'jT4�Z��c�J�!鋉�������o?�����CW<��x�����w�s�� Յ�Dz&*�;vr���M�}�`��z"���h�I�33��E�I�$K�;$Y���E�ϛW��O���8]_�'��ӏ�������I?H�I}28��q���.�ռȱ��A9�l��	��u�:e���&�Wox�p� 遗*��m^����6F�M��n��E�V�ؕ7�E"��V��&Ԧ�3L��^��\��C��k�1w;�����_�Z��P�K���a�2G�^c� {������툞����
�ط�P�X�c9������堈8��psd9�Y��Q/�v���A�?��>>�|b9�?'^���k���W*�0���(�IRb�f?���&1�gSVr��FE]<�$c��?��K:�L&���%��'y|���?�c�\ӽ1�g���:b�h�D/J'7���${���$R�����Q�6��臎X"��~�%�Ո���,��F�ѫ��W���s��E�;]f���ғ���Y4�p�$�gf����ym�l�F����A��oG�)��T�ɡ�E�m�M�P��Y���&�lR�&������i�+,R��b��h�C�,˶��^�p�R���:����X�xg��o��2�M�o��8�q룃7Xo�W}�����Ӿ;a�DP�'�s���:kF�41?&��*��P����,���Y�c�
���k_Y����,�4ց@ː'f�2T j��ycڰfZ&fZc<�-�:<s��"8�8Ӟ�`77��8�����]p����c�ˋ3f=|B��3��)�E�x�8c�^ɠ!>.Ώ�9�\����E
p���Y=Ƌ `�]��q��+����E�fϢ����A�G�w��g�d� sU ��G �-!��yޥ���١��jЯB^��[`=B�*��Y$��r��g��(�E�(��Y� ����g�=
��g�W���^]�5F����g雼r`L,5�����QtHiq��X�����C�uU@� 9na;c^���"*�-�j� 1M�ܫ�OA��ʥ���Y��D���M���B�GA�D��8Y�6���y������,�2��,��&w}���W��u��_;J㢏���m�VLv|�]�|~��=&�UT�+���������*G��g�4VIƖm����!�&i���l�v�1\�B��f��Բ�WA��z$�H���#|ǳ�֞S��N��
?��"���&�i`��ԓ��<�K�d0+YE�A�U��v�0IP��4�&	L�:�<T�$mu���a-�$A-U��L67I[���Ș0�0I`R��	�L��}y���q��~�]�׿f�5�I?� C`� ���>k��l��,��s&�4~��*j���@�*��8):���4$���it��w�yx��*܋>ps z�$�N���@^g����~�����t�CzQ(8���!�[�:�lQ�I�KA4
�~'M��Q�3�F��v�,]4
��wҴ�U<ڃ�ԠGE%��)�J�;����u��?~b���[�b�V�N_1�R��Gm�E�V1=`E�8f��o����RA�M���<~�@R���!�uM8�}%ŝ�zuJ�qN���H$�`1{t/���\���Ke���קK-Fo,&H����&�`DES�@��'�mE��"��P� ���@�u���(S�2Y�i\����'h�E;y���m<�Y����,�x��rY$(]GN�6u�"�(��<T�NZ���Fڌ;i�L���,�QE�,�Q��,���F���VD��Gۃ�������]��/�.��F�Y�WE��ج����5/��|���Yz[�]zS����E����Fڌ�6U��4j�Q�^wߗZ^����5ԓ[]$h{[��?�����_�٢�t������:��R��W氊LN4�o��琎	l�F�,�6E�H��8��bF��b�u?���"�zzը��U�m��k�߬���i���o��m�tMF�Ll� ��K�B6Xzc��c�$�$A�׏� ŝ����C �#|�}��&�J��b�tg��`�E�k�nKD����Ht-ԛ�R,E�����'	J�����4)F��{H�F}8m�I��7H�F�^&��~z>E�(=��$$E�(zD&�(�7��R�D6E�,=��a$�����h1)��6�N��I�|O�<�D���.�K����<M�I5*�$ը�z�j�P=)L�.��!G2Mr���2���)g�Y���r�2��P:]i�-�}]��
����/j�gvB��n�(�셄swBf��'8L޾gJY�Ԥ�L��/aV}�q|ʪOC��S���c�M9��"��R� EB���	��{|!���C�]DBz� ��E�!��*��U��������-m�sH/��*��LV?�)��>h���'��[E��B:��V�Ƿm�8�:���b4\�Y���>�LUR�*�sum�zy�*���~�D&Et�%�8��w�X���.��&�D�	��<ܕHM�!��6A{UFN�Tȩ:�n79�O!��4T�j��E����s$󗄳��n�]	�+�A�ru����v�k#��I�6���#?KGцE��8��a1N0�`�@�h��9N��	���2APǺ��E����Z����u�{Oe2��6Ь#MЖ0�2�����D��S'hk������cF��}��C�"�1��E�;i�L��u��H�v��4�bY$(��٢�H۟I5�C<�E�mO�i).�jI5"h�i���e�CRY$(�.x^5*ܓ�m�[�]:�E��0���<O�QE^��H�/-������"���"�B�Q�3Xv��mf�(ñ�u� g0����u���hdf0ȼH��e�($h�.�S5"4��H[��i�uE5�sH����E�=��Fpf(y��?�jT�?�"A�m�v�n'��Wը�zְH`S4"l3-��Ŷ۽t������k�<3U]n��ם>*�~
EH�E^���45�(B��/r��#)ŷ�����v�l�`=i����Q�g�Ç?��HPO�&*H���zf�U����"Ͷg�5h3�����"�ё��i3/��|�[
	�]��o��x���-�Q�v��{�7���j��8�����}��Q��}��o��=��������@z������{��~֛x�Aa�M�ͅ]Ao���8��0Y�M7+LVo�%���>�Y�E�_8e�Ƭ���֗n\����z�[�����n���Qt荽ӬW�bx`TD���VwV�v�/s�5G���(r���&(Z���I�U,��oV76�V�q��g��� �@R�2'���M�<}��)�_�|��/
��H��l#���/������?~�ˏ����;�K��    �i����G��$�a���}�+����5�\b�Ψ/L�A�7��`U�qJ�n��n�uFLz�?�j����A�o�-\N���S�i/	'퐓�L��ߙ#dI�K֯+���?�����������ɼ�+&�^����n;rKx��>�ɺȫ/�A�����&)q<�v���ˢJ��g]>r�ޞ�?��k'�"��+9:���������'£�������8���U���:
�i����t�}U߻#<��,v���s�	�aⓜ�"_j;9/�L��g<k_$�-)^9�Rx.a�_����!%�2-�#! �C�+�����Ĺ��_ιT��[{�m�����d��T�԰� �mIkre=<�Y����0z�EҊu��3}#�E>lN9$s��T�[P���0��rK�3K&���a/p/YtA=�qc�CW-�5�@��"�k�V�� �Hqaq����m��.���G��Xqy�f�)N�I�Ëca4��=�gٓ�!�\sŋ0�sy�@�.>*��ѹt�"kf�63�<A�h�i�s+�"C9����n/2D%��E� �{�!�T���Ç`��"���[#�l�6i���E�k��")�"��x<�E��nq4�&*9��y���C��y�#�p�%r�@@�2n�y�oĢ/�2�7�̀Xe\&����^�1� �L����Q�S,��|]C��^�-�)��Z%�$H@P���PsRT����`�'����=����k$VG"𛅳<;Qby$��e�X���WD�/��P�&����l�p�<�<r�Y�8DGr_(1qn�0Y�d�#�NV&�@��B3cLf~��a����;)�J5��^�����Q�����u�u�ɖt긟2)�)
�������2��rZ�,
�a;%�MA$za��*^���ǫ�� ˣs���V�� �Z)\5����ea}$���#��d�$��L�u�&D�V�`/�NA4�*K��ו*��Y���镧����R9KM��ye���-���Go�l���R�6�
*�q��T!Ȼ;��Xr�|��(-PJ�}TZ�>$��
�B~�xxV뢏���Y�Xu��V�CmfY$��a�)gװ:��t��X�@��X}���#�@ѥ�FWw��U�%���}���A�G��8+�+�͌J�ɱ!�r���¨,��t#�bWWM��m�f��ޱM^������>��g.�ꈫ<W�ƚ��8H.}�X@�	g���ez�tI�|���MpCY$Y]�FY#ɡi�ثg�$k��RkD���H��F�X"�ܴޣH��c��2�gl~�{�Ɂ�t������ݧ���
�]CQ.^��+@:��k��,S�^��ImV2~e��љ#��8A2SMԑRA8#EH)��̌udT�d�c@����:R*\; f&�:2*0f�.ԑP���3�ԑO�1#MB��H;SG6�,�$V"��7�ɣY�JMabf�,Y� [��2T�V����u����X���Z'f�c!$��}��-�r
��@�;QX�i���J�g�O�AQ{��{ޕXҴT����� MK�nqV���Ѥ�E�Ǩ�8�`�1��gu�,������a�Y�cdpmqV�*�����<F�喰8���@y�jI�3�ja=����lp���u%������v��㗶8�^e=$?ѽ��g���q���5-����H�Wk^�5.+�A �Q�uqָ��K��]W:��\c=$��mܘ���t8��q�χC��dU���#�g���@�jˋ3��zD�6���8#Om�HcԜ[��W�G͉�Nw�\Pξ���ݐ�X�Ǩ9Z�iOi�1eqf;�	�=�����ĭ�9RƎ�21���.�䓋8�u���+��҉�F�q>Fu/w�@k�,2�μCM�<j���hc�7>I}�d�����,=�����zy�Px�Jp���<��K���2����i�rعj���k��{�A.n��@�{�$�����"#��xjA�$Fr��ւd��@T;ҋ�<
_�v��ir��}�}���F��8]X��SP%��C���na�K�3Խ�5+��(�PD͉�%��G�F6E*�}$�}߈�O�{�a%�4
LԒ��bp��$�H!�ۅ��'�<#6�7��7Ҭ���I�H��/�>��D	#t���D��L^���՝ى���O�A�<�c�a�?IR}*(�T��\Da#M%I���aaT��A���?�Zj7�4.�5��A��!;k��*E;h�	��(�D�o���)��D	uZ�B��G-�>��� E �ʨeQHS�{>�I��͵5ܲ��G�NZzQ	&3jET�dF��d���4K�T��J(�P+�R|��4ڋ�S	�Rv���kE4���Zi;i-�h��t:���H��o1fE��Q]k�I���S�Ц�ԐO9遟Ɂ�{'=�39�AV�%�#�7�y ��c�8偾��Lrʃ��ư)�W5�3��x��qq!��#�8߁�fE��X6�؛jM�A�+Zkh��q���}�N�8 !D'�F{|�uPB�N�<�����>���w�в�����Q���ַZ�v�ʋP0QPG���Vu�.�QI��xKC jy�Qӯ^�*P-�j��뎚=˫Z(׈w���٬ j4�v4�)l�2�!���נsAԂ��:ZvԔ �Z0uPGێ�V��Su��)AT�Pr���5��ߩ�aT�
�@�Q��V��%�Z(=�����դ?YPQ+���â��aG����Zq[}��;�c+�ఖ�(����Q]YDܬ���b����ƨ�*�vԬ+�Z%��AU�V��P�2t�5N}:*jł���=�j��T��L8��5m���5��=_j��]��c�0�݃�h������ø���$p���0	�R�t43�vU�8q]�� ��N4����ʊhط�)9�7�;+��c�x�a���"�u)ӟ*��C��Ȧ7�-W�rw��?3,��JﯟWE�7Ūq�i t����epk�_������'����\}�J;zP񼇃��r0�SG�DG>�KoU��]�-v��p��ɺ�p����W����9��Q��Ӈ|>o�h�����F}R���O����&��V'���N�a�53��s>�a����{�������^��x(�TG�D��d��*^�����N�C	�:Z'
�w�\�=�_� ��ɜծs1&A��!�q|'�� O'����8�����Ե�YHp����d�[�ua�mfh�		�;E#�t����t�J�s���iϹ���=D�������q��x�H�f��z���h%�d�$�h�H�&�@��Q�a3�I�A�;6�l{���~�Ǵ�v=E��6��獴�)�L�Nh�F�6�h��F�O�*�~O�'ѨB/����>�O�Q�6i#���D#���He���&Ixx&Jx��[(� ����R���h\(�@�Q�����h^(�T-���T����v�lVV�
lV��aG�
�Z(l��9�����Rjt4/��E��Ns](6�Z9@��-8��5g���T�Ƿą������%j��?-���]��q�B�����ת�
<�԰Pгj�Q۪��'�J;j�jeسjY(���U0�v��@S�P���Z(�FG�BAh�L��Q]n����o��֡�o�V��_Ϩ�F��Й%���Un����;jU 8Qf��h\(�����UZ�]Ψ�UP~����"���'�Ѷ��[p:%���)���۔qF�Bׇ��*���f�����t�vԶ�c�B���P{l_w�v���ҕ�tl��3��(�u'�$�������U9t��ޓ���<�m����A�]Ӫ�������mcu�Y=�*�vBlU6�;X��V��C���� TsI�.�zM�Am˺*b�E�����Ok$��PHNA\�$Ji����S���A:,ZI�]��i����}3+bI<^ˬH�y�v�I>p�.ڻ�m��]$�	i��T�����[�ͬJV�(���f�(M�A�h��oI%1�;Y&����1�s��mҟ%�l���P�V?H1�a��;��Z
�� ���i�̊j(�w'�$    �U�����E�xf��X�O�6�U+K��q#M��4��R՞���d��"�q�)���In���5C�Pr�>Qr��?����O`])�]�cP��jq�A9.�k��:�jq_��� �E������Ib!����έv��4%kn��M%+�-l�]�8�P�x�_��6Ү@�$���F�U�ꇭq��ʤ��o��|��8L��o�����w�/�W���ꇟVòzE<�`�}=���9%E��i��e�B~]�"��$�k&"n�I�:�'p�*��D�����Ï?��/?�����׏������a��?���"��/����4�s'�W�����F�Ro��x�o��J�:���+aTg�)��w�~"���J�o^��j�	�����w��4i�@�9�:9�rI�EyF �h���?h��m�|+�F�B�Uщ'�+�?�U`��{��T�AX���Y,ֵ��VY�@X��j��1e�By��Z8=KGY-j�ĴP�,W�Z矘Y�����@�.���j���*�%IK�;���븮<�Ȣx���D���x̀�X\���9�>�"��I����C��H:eS��3��[- ������I�x��	�#8PG��t�W�2��w�)	@|u�@�� �c����ɨ$���-�S=Y(��()I� ǻQ
f�dQ2�{��J���U��}��W
�SX)"�Tf�4����W��hP��Q���E,�A��IQ:Fzޭ�Z�꜕�c�v�e�.�����k�ԀdS�oB��Δ�?���W��1	�"��=̗H�O9�u3��4��!^�u�Ѡͤ�����W_��>�D\<=@3�(Z����'����D%��-�>�c�4ZY&)�����J�E�6�Y'��즅~�Re�4�բ�2i�c�WVI_Ymg�����I*���q�ƳH�ǲ�Q�nj����H���W�+����� �2g_�h��_�%t���Y�:���u��f#��[eF��h�,����[�L #��뺪�i69�+��]���Ek55�ʝYV���ɉ`�IeY0���*e'Y/�謣,a��c�d�a$N�(�E�M���U��2egY���ɳ\���Ț�QV˳��4>y���޺��'�Ւ�vX��.X_i'���f|�->���(��h�e�ض<}$%���Fc�<��M�:��f�U�O�t���f6l����`���`˝K���rޛI��A���Z�")�^7�ީH�}qCPёocܷ����v޹ ��Q���ǴP |d�����sY�-��]Rd�ȎA޹&6�X$N�s~rց`J��'N+��X�j�?�\�A[X�J�sY8,N*]#�8�r���)����!�w��~��@ĭ����M�D��d�0%R+J��Y:X|�S�<��6��r`g�hRt�/��*�.Z��F>� ��hUP��YA<�fѪB�2����MA�hq�_��%�E��AA���B�ZU��ZE�a�P��T�n,� ���SW����"��S�
��͛Ѵ��cU�K��ܿJ5+�;V-�* r���6��&r�)�y��-l,е�\����D�'�&r��*d��X�(�umuc�X���#��Sp��|�E�o�}�F�������	�� ,�Mk߂"�ZŰ��Ur��x�l�}4H��L2���ȉV�[=�U2꽂�U>l,�����t0)���h��Ѭ���U,h���W�� �Ъ�U�;�! ��=���N���a�C�ӓ����&�wk�+~�P���dp4�l�>7��)̼4ul��*��sh��Z07���!9L�Ò���b�i̘af��Q�+�NK�����"�q"q�r���pT�7��f�	�j�z���&FȂ�I��ޟ��)磺�����N�`$h���UЈ�����^�3��'N3f�9b(�?ǔT(��4*�Z,�D*ɾsEI��h?<^�aO��JU�Q���6��R�P����T��$B�ޖ��(�N��G�6��D AS'E'��sG$:I�˦�D{4�5�L��$�}n�uRD��<YT*{�ӷeQ�WhS��II�\�,"ŭ�3�tTT�\@�w*�J=�,*I�q�(������$ѳ��e�"�:��?�E&��u�>�S��>�N���L��z�	F�"2I���q2���eI�w$�{���%�#AZ`a�C�*��	_��2�iG���v$|�Gz�9G�`�*=*��t�CGU�����>F�a�ꑻT/�n�<z6DM䂯X9@��V����Q�Q�6Ҷ)J�I�)�ǿ�D#�`��hw/���D���<}Ke�'	��d'2=y���(U��(	��p�z9I�)z��k3'#at����6�2'#-B巍�d͜�d��t�Df�;jd��h\h�řH����i#���I�4x�:y�)���׍�We�&	�D�}�F���0ITz�Hk��A4��7r����#�'	4
�q�Y'9n�|��� U���6��|����a#͞E#��&Ǵ��M�d�Ռy#�E#�g�XwԜEc[(4�L��>�����Ja��WI��rJ�c�5�_�IOf-�/�Z���
�E�A	�/�R��O9�5բ�P�,�Q۪�U�DeG͡Mu����c�BdU&	���)l�e�4��ၜ
�v֕_��%���U
���K
���mG�I����SD-�,����J\(�E�³K�5�@�=������{�EVU-<U�����/t��j�٥ƅ��Rӎ�}��Z0�_�y��Y�^պ��_�BA��E����
zV�5��Lx�`oi�k�vs���G��j^�ގ_֭���D��-�λ�������hqnG�
���qW댆��
�Z5�8U+!	��Xķu�������YeGmԅ�s:*(�e��ݳ�{F�t�"V7-pn���1C�t�"f(��ZĂ��
z��[Ċ�U���v���ܺ����̽���ܼh�Ys����gT��	7���.�=����W	�a�2���q+�0��,>�-�*���y%��Dm��-�`���>Ŀ�r����q���I���2-�Y��T��������
>�EQ�'t,I�UN*`�S]m/���`�$҃ޜT�Ɔ���%�~�E��'��z�dH%Qo�����"��b��-v{�4[�)��M��*^Ĺ�/:����'����4�,8@X��8�a!U��܊%�CodQ���@}|0��(��X����TÓ��E������&n��X�,
F����|���E��	,
�s�����If)�`L�l{�G]�(��mXĩK�}`W��O�����7�h�ը�_}Ѝ��ۃ:_{&�K��Z7���K��f��x����X����.��0�ys#3�	�<*�0Z���Jm���k�D� ��O�ri��n�eRTJ0�Qi������X��D�35U����DQ�D$�2��չ5/|V��/GV'"i`�����ŉ�WC��4���5��h���*Ө�y�����v��D���D*��z��zQ�HT5����Z}��0Q��W�2$U+���z�����E,��w�O[�H%�`�1 �������uT����f������B"L.[�����T��{�Ok���Z˅h��S���I�P1a�e��u�D�H{X���D(�3�F*J��O�[���0z	�^��*���VQ�®�4�a&� _W��O�4��/V��=�2���Y6�:P�QBff����zY�?}��iu<��s�U9�4���a���,=2���:/�jJi�(�$*%l3o�uV_��D�K�JWW5�`�r��$�I~#��hsfV���l��O�$�t��hGM����=�jY(�*:y�II��9fkv;jv�,R�����
d�"��y�kN�:ݘ��i>�*W�� �\0�l�e��}�Q�\wԔ+�\�k�P`����հP W�p:�Z�BQ]E���A�B��i�LMC����ZD-��V7QT��U�_��EЯU�
0+s�iG�>PU-���ּ� PU�agՉ��H�ڦ�DE-�V��(rV�;j:��Z�mv\ص    8Q�Z����Vb��D-͛jU@��d��UQ�_�ͪ�h;jYmN�����j��u�ߜ��P����j.��mU���P��;���D-M�j9���,Q'Cm�-����;ju��U����6z�찡iG�qa�y[0j�:��_�;�؂y��E�w)��?�/خ@�6�~sI��������l|R��lzb���c���a�_�E�U����"ݓ�x-�vW�7h9�c�"ޓ�n-�z�7�ȧ�լ��E�+�n����X��,
��L[��]��-V#��O"w����I�Hq�ز(�o$U�=�F^0��(�Q�̎�D��֑Χ�-��w�D�� �O#Q0҃jPX�6��(��Π�I5DA�}dâ`lO�,
>�~�h\za��yf��F�C_��Ƴj�������������t�v~��ʿN䓽��y��[���s�$/]k���6��Sϵk}�]HJ#b�Hc�^����l���$P�{>��i�#��x�N��J�w2KE�H���~����e�3�9�ʫ���s-׷?���Uosҵ�֟��3:"���Mqo3.���Ɵ�o�p��ؿ���������=�T%�)�8OiH��~ҕR���?��S�O(ծ��E�P%Y z��A^!]y ��ޱ�G�`N����Ǌt�6�j���<+���JbL����r��ޱ��U>Jz����ը(�a�*�kN����V�ɈR~����ILZ-J>�i��ϑ�~��4��lF�YZ���n�6���	l��[c�
Y(M`cՓe�˘�L�eҬ4�L�eҬ4V�,�f��Z�"iV��MI$}p��l�d����(�D({P'Y%Mas����q��������t��{���f�>HNk�����}�y�3Ԓ�,lT�A�Օ����VE�Xi�C�m�3w�}��3��+'͞d�,�l��$��l`Vr�p��k��#nbg#�	��hR�@�����o�hV�@��Ζ��'N��6F���6E����Q|P���i�=Yk��t6(��.kVQ
�N�d�E����QVL�蘊V�D������e�H*k��lU�����\t��aY2Iϳv�NfY1Iϳ>aOhT�A�Bq2���0˯v���0)<��L�r�U9M�L�c|t7���'�t:[��n��Y57ӂ�M��h�qn���/~N��\t4|��7��;�*����w���ʂ����@�T���r�u%��=AE�'��Ƃ���q�β`><aY1/}����ټ���Yy�k�n�����e�<�#\f���>�E�'�,���͢�9�l�X���V�����˺�'}=�n�
�,��`[;��6���n�t6l,�oa�t�۶�6�̄�Y�M��M�J�X�[a�4�]���`��M7�M�U���Ut��Yݞ��7��*�=C�6��*���U�Mw�m?ԍEvY��66�/��k�[|[bu�u�8-CgY7ML�qz���z'��,�qZ�βn�F�n�� ;DgY7M�`ׁu����[Ŭw�N��Y����Cg�Ƣ:\+�8�)p���j���6��̏�㈔�^����%�>?+���J2*�c���nе�{��_,��/���߇a�e]����Ch��x���w�D�l��p�nm���X6��[%.�Op|�����q�����be��Np�;���]�-��Vw�Du/>�B{������ ���T5�x]��DE��y��OT5�;tsB�w��!�d�ιU�d���h�Q�ZQ�$Ae��Q_-u�*����aC�wt�݊E���ԁ�a�yGm�r�s�t�
)��oOa:����g�s
���i��=gP��Fֲ�̜�����q#�w�MR�dP!�^5�P� �ʡ��h��$2�����D%�ꤓ"qJ�$��Ʃ^'E$yyj�"E�t�䅨�v��)����N�D(�I'E"y�i�S$��(F�#�(��%��⛚�7"�l��<����I�(�F��K:�#I��޾��h�(\#�,B��%BE���y���m���h�{׷�u#m��T�/�U�z���l'U+�k��"U�Ц(jR�F����6��(�Be�������qM�&�F�:٘d�0�Td�� �@�@�m`��Z��S������`��h���l���#,]�)���m�Y�&�xlS�A�]:)y�PKiv�F�U�
r}S�*l����tRD�Zޗ���2Є�D�A���H����2�tRDK:����F�-����F�`�D���O3|p�Qܧ�Ӽ�h���tR4���b��?��s����iG��8�(���4o+��1G�53�s'�F��s��8��ܾi�h�Q�Yqt�� �‣B�5�x�#:�x��QI�� ZE\S�H��k'E�u
e#m��N���2�E���E%�B��AIԝb�H�EQ4j F}'i#MƬ$�#QT��M:Zw��T�(�B���Ot����mGE,��T�;jW@�Ҍ%�^�v���I+	{�L���VU/�����A	��Y
��T�}@iG�QC4�U�4��e���ax����fò*��
t��9qe��r MG㎚?/Y�x�f�QӯYԂ�H:Zv�n�QQ+<���"��M�U���}��Zx�)q�v☎����ZO%��,U+��5�-�V�Ϊn��Y��9
���R�u4�鬪ji�5�p�|h�Q�Q۪����j�$����߾��cM�Ҝ!�w��xj"V~[<��.B�b�Vu��[C�JXb�7'C�"ag�Z0�DG��uU�
H���nG-�ѩZo�{NDv��@t�V�uM;j���h�p>��r1Τ
F��ǣ��'���I�]wڌ7��&p�A����8����g�����s>�����<�42�J�gy<S�ٴ�(��Ѫ?]��^4$��Ӣ���^t� "j$#�|�EDJ�DD}v�q,�����TCD$���â���7}DC�����m�H��∟o-� ��ĲH��>�=�Q�p�F�����v�Ca�â`�{�8�G�Q��IE���;,
j�y۲(�1���1����wX#���1�x��"͞N��"����=j������twԺAg�D���M7K�iPr˪X����Tc� ��$<�����R0y��[Wr;j=d�00�xG�h��7s�"��c�q�i���^�d���k �(�F#n[fWP�-8��s�zg�H�h��!�;*� b>wT��0*z�V�Z̸�"W,�L�b-��Y����
�ͻu"G�u��Ќy4� �F�ȣc�u|��Q���>os��(���]�ȁG�;m�y���'�V�¬�;Y7�.�)	߀�ꔅΪ"����P�5(�O���"�+5m���JJ�6�T	�_�F�ŋP��׶��ͦc
7��L��6���ɨ$.^d���F�)	{I�4��U�2Q�'����c���"$�c* �ɉXT��]ɉZ�h�QkS09�˧��<� ����jre��*�R�Ѷ���M���`��Î���8Q4�W�*��}�'�}��5�:QlVM�)��B�A�A/��:!��������iU �D�����7�h�Qk�M�Mt�G5݄��.4� Ű��QxR��X 8�"M�Ĩ�l��)nT�*�߱M���vԜ��_@�&�O)����5kK��%���ec�EwJ"��d�?JD+��e�/�D"��d�P�LC� QF$�.;T@��j>cT��x�V�D�X�UU��f5Νw]��jC�v5���ơ�;�� ������+}��q��u��l���;��qO�[6٭��'mk�QNBښ���Ȯ��T��p�I�(��"s�4��>Ѯ����|zbY����u"�2��a`���%ݬsU�t�wUC|��*�0�,
�'����B�wX|�B��`�q�Cj��FI7-7�àMOf妓'���aQ�A,���j����o�·\�WD�밪ju�W��p��u��km���:%ɯ�A1]�#�;s��-g�Bw� �K����b��\N"q{�_�]�    �`؝���UB�ϡ��x�������X��@��}�����������HG�1<�!�����$G��0����ŧ���u�|'E���"���==��#��wll1]������Rk<�Q���,��8b������{���O�EŠ�^ފ.��� .�U�o�Vo�����b�����g{�
nUx�d0P���޶4�h��7��{��R䎊�y�����O�����kF=�Ӕ^�2�����?�������      ^   z   x�=�A
�0��W�A��&=�F�B���@(���U�mv� 11-��!
Ó���֔��۶�`�4����?^��Ǽ���?悑�q�0u��oI�}���ŕ]!l����,A�&| ?�a"�     